const { subtle } = globalThis.crypto;

/* Generates an AES key for symmetric encryption
 */
async function generateAesKey(length = 256) {
  const key = await subtle.generateKey({
    name: 'AES-CBC',
    length,
  }, true, ['encrypt', 'decrypt']);

  return key;
}

/* This takes care of the symmteric encryption
   NOTE: an iv is required, so it is randomly generated during encryption and of course
   the same iv must be supplied for decryption
 */

async function aesEncrypt(plaintext) {
  const ec = new TextEncoder();
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(plaintext));

  return {
    key,
    iv,
    ciphertext,
  };
}

/* This takes care of the symmetric decryption
 */
async function aesDecrypt(ciphertext, key, iv) {
  const dec = new TextDecoder();
  const plaintext = await crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, ciphertext);

  return dec.decode(plaintext);
}

/*This turns as array buffer into a string*/
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/* Adapted from MDN docs export function in encryptionOffcuts, exportCryptoKey2
This can only export a public key as note the "spki" format, where the private key
requires pkcs8 format. It exports as a string, so that it can easily be stored as env var
 */
async function exportCryptoKey(key) {
  
  const exported = await subtle.exportKey("spki", key);
  
  const exportedAsString = ab2str(exported);
  
  return exportedAsString;
  
}

/* From MDN guidance, creates a string from an Array Buffer
 */
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
/*
Exports base64-encoded private key (*not* pem format)
note key differences from public key logic, it's pkcs8 format, NOT spki
*/
async function exportPrivateCryptoKeyMdn(key) {
  
  const exported = await subtle.exportKey("pkcs8", key);
  
  const exportedAsString = ab2str(exported);
  
  const exportedAsBase64 = btoa(exportedAsString);
  
  return exportedAsBase64
  
}

//adapted from MDN docs provided importRsaKey2 in encryptionOffcuts
/* This just takes the key as a string and does not involve the headers or the base64 encoding
key as a string is an easier format to store in env variables
NOTE: this is specifically for the public key, based on the use cases, the private key will need
uses: decrypt and unwrap
 */
function importRsaPublicKey(keyAsString) {
  
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(keyAsString);

  return subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt", "wrapKey"],
  );
}

/* Working system to import private key that is encoded in base64 (*not* pem formatted)
 */
function importPrivateRsaKeyMdn(pem) {
  
  // base64 decode the string to get the binary data
  const binaryDerString = atob(pem);
  
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);  

  return subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt", "unwrapKey"],
  );
}

/* Function to generate an rsa key pair, note the bottom array which lists the intended uses:
it is necessary to say that they will be used to wrap and unwrap other kinds of keys. Corresponding 
uses also need to be listed when importing public (encrypt, wrapKey) and private (decrypt, unwrapKey)
keys
 */

export const generateRsaKeyPair = async() => {
  let keyPair = await subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
  );
  return keyPair;

}

/* This uses a private RSA key to unwrap a symmetric AES key. Note that there are various
options, like the "raw" format, uses (encrypt, decrypt) which are all configured as they
should be to interact with all the other functions in this module
 */

export const unwrapKey = async(wrappedKey, unwrappingKey) => {
  
  let unwrappedKey = await subtle.unwrapKey(
    "raw", // import format
    wrappedKey, // ArrayBuffer representing key to unwrap
    unwrappingKey, // CryptoKey representing key encryption key
    "RSA-OAEP", // algorithm identifier for key encryption key
    "AES-CBC", // algorithm identifier for key to unwrap
    true, // extractability of key to unwrap
    ["encrypt", "decrypt"], // key usages for key to unwrap
  );
  return unwrappedKey

}

/* This is a proof of concept for all the different encryption operations, showing that:
a) data can be symmetrically encrypted
b) data can be symmetrically decrypted
c) the key for symmetric encryption can be wrapped with the public key of an rsa key pair
d) the wrapped key can be unwrapped using the private key for the rsa key pair
e) the encrypted content can be transformed into a string, then transformed back into a buffer
for decryption (though this is not that useful as it will be encrypted again)
f) that both the private and public keys can be rendered as strings, for ease of storage
g) that the string forms of the private and public keys can be imported back into working keys
h) that the imported private / public keys can still play their roles in i) wrapping the symmetric
key and ii) unwrapping the wrapped key
i) the unwrapped symmetric key can decrypt the original encrypted content
 */
export const encryptionExperiment = async(message: string) => {

    try {

        const encryptedData = await aesEncrypt(message)

        console.log('encrypted message: ', encryptedData.ciphertext);        

        //entracts components from encrypted data
        const { ciphertext, key, iv } = encryptedData;

        //this is just for typescript. It's already a buffer, but this classifies it
        //as part of a Type that TypeScript recognises, which extends the .toString() function
        //below to accept the argument 'hex'
        const bufferedCipherText = Buffer.from(ciphertext)

        //stringifies cipher text
        const stringifiedCipherText = bufferedCipherText.toString('hex');

        //transforms stringified cipher text back into buffer, note 'hex' must tally above and below
        const backToBuffer = Buffer.from(stringifiedCipherText, 'hex')
        
        //generates an Rsa key pair
        const keyPair = await generateRsaKeyPair()
        
        //exports public key
        const exportedKey = await exportCryptoKey(keyPair.publicKey)
        
        //imports public key
        const importedKey = await importRsaPublicKey(exportedKey)
               
        //wraps aes symmetrical encryption key with public rsa key - POINT A
        const wrappedKey = await subtle.wrapKey('raw', key, keyPair.publicKey, 'RSA-OAEP');

        //same as above, wraps aes symm enc key, but this time using the imported version, to 
        //show that the export import logic works as expected POINT B
        const wrappedImportedKey = await subtle.wrapKey('raw', key, importedKey, 'RSA-OAEP')
        
        //encapsulates the wrapped key (already a buffer) in the Buffer type
        const bufferedWrappedKey = Buffer.from(wrappedKey)
        
        //implicitly creates a hex string from the buffer above then turns it back into a buffer,
        //to concept test the storage of the wrapped key as a string
        const rebufferedWrappedKey = Buffer.from(bufferedWrappedKey.toString("hex"), "hex")
        
        //contd from POINT A, this unwraps the key using the rsa private key
        const unwrappedKey = await unwrapKey(rebufferedWrappedKey, keyPair.privateKey)
        
        //contd from POINT B, this unwraps the imported key using the rsa private key
        const unwrappedImportedKey = await unwrapKey(wrappedImportedKey, keyPair.privateKey)

        //export and import private key
        const mdnExportedPrivateKey = await exportPrivateCryptoKeyMdn(keyPair.privateKey)

        const mdnImportedPrivateKey = await importPrivateRsaKeyMdn(mdnExportedPrivateKey)

        //unwrap using imported private key
        const unwrappedKeyUsingImportedPrivateKey = await unwrapKey(rebufferedWrappedKey, mdnImportedPrivateKey)

        //symmetric decryption 
        const decryptedData = await aesDecrypt(backToBuffer, key, iv)

        const wrapperDecryptedData = await aesDecrypt(backToBuffer, unwrappedKey, iv)

        const wrapperImportedDecryptedData = await aesDecrypt(backToBuffer, unwrappedImportedKey, iv)

        const wrapperDecryptedDataFromImportedPrivateKey = await aesDecrypt(backToBuffer, unwrappedKeyUsingImportedPrivateKey, iv)
        
        //log results symmteric decryption

        console.log('decryptedData', decryptedData)
        console.log('wrapperDecryptedData', wrapperDecryptedData)
        console.log('wrapperImportedDecryptedData', wrapperImportedDecryptedData)
        console.log('wrapperDecryptedDataFromImportedPrivateKey', wrapperDecryptedDataFromImportedPrivateKey)
        

    } catch (error){
        throw new Error;

    }
}