const { subtle } = globalThis.crypto;
import { sql } from '@vercel/postgres';

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

/* As is stands, this is a proof of concept showing that you can store the iv as a string in the database
then use it in decryption have retrieved it
 */
export const encryptAndDecryptIvStringConversion = async(message: string) => {
  try {
    //print the initial message passed
  console.log(message)

  //symmetrically encrypt with randomly generated key
  const encryptedMessage = await aesEncrypt(message);
  //extract key, iv and cipher
  const { ciphertext, iv, key } = encryptedMessage;
  
  //make the buffer and iv to facilitate stringification below
  const bufferisedIv = Buffer.from(iv)
  
  //stringify iv for storage in database
  const stringifiedIv = bufferisedIv.toString("hex")
  
  //queries for insertion of iv into database
  const insertQuery ='INSERT INTO encryption_data (iv) VALUES ($1) RETURNING id;'
  const insertArgument = [stringifiedIv]
  
  //insert iv as string into database
  const inputData = await sql.query(insertQuery, insertArgument)
  const id = inputData.rows[0].id
  
  //queries to retrieve iv as string from db
  const retrieveQuery=`SELECT iv FROM encryption_data WHERE id = $1`
  const retrieveArgument=[id]
  
  //retrieve iv
  const outputData = await sql.query(retrieveQuery, retrieveArgument);
  const fetchedIv = outputData.rows[0].iv
  
  //bufferise retrieved iv
  const rebufferisedFetchedIv = Buffer.from(fetchedIv, "hex")
  
  //decrypt message and log
  const decryptedMessage = await aesDecrypt(ciphertext, key, rebufferisedFetchedIv)
  console.log('decryptedMessage', decryptedMessage)
} catch (error){
  console.log(error)  
}

  return

}

/*This turns as array buffer into a string*/
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/* Adapted from MDN docs export function in encryptionOffcuts, exportCryptoKey2
This can only export a public key as note the "spki" format, where the private key
requires pkcs8 format. It exports as a base64-encoded string, so that it can easily be stored as env var
 */
async function exportCryptoKey(key) {
  
  const exported = await subtle.exportKey("spki", key);
  
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

  // base64 decode the string to get the binary data
  const binaryDerString = atob(keyAsString);
  
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

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



/* Working system to import private key that is encoded in base64 (*not* pem formatted)
 */
function importPrivateRsaKeyMdn(pem) {  
  
  // base64 decode the string to get the binary data
  const binaryDerString = atob(pem);
  
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);
  console.log('binaryDer')
  console.log(binaryDer)

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

export const testWrappedKeysDatabase = async(message) => {

  console.log('message passed to function')
  console.log(message)

  const privateKey = process.env.PRIVATE_KEY;
  const publicKey = process.env.PUBLIC_KEY;
  try {

        const encryptedData = await aesEncrypt(message)

        console.log('encrypted message: ', encryptedData.ciphertext);        

        //entracts components from encrypted data
        const { ciphertext, key, iv } = encryptedData;
        
        //imports public key
        const importedPublicKey = await importRsaPublicKey(publicKey)        

        //wraps aes symmetrical encryption key with public rsa key
        const wrappedKey = await subtle.wrapKey('raw', key, importedPublicKey, 'RSA-OAEP');

        //bufferises wrapped key for TypeScripting
        const bufferisedWrappedKey = Buffer.from(wrappedKey)

        //stringifies wrapped key
        const stringifiedWrappedKey = bufferisedWrappedKey.toString("hex")

        //make the buffer and iv to facilitate stringification below
        const bufferisedIv = Buffer.from(iv)  
        
        //stringify iv for storage in database
        const stringifiedIv = bufferisedIv.toString("hex")
        
        //this is just for typescript. It's already a buffer, but this classifies it
        //as part of a Type that TypeScript recognises, which extends the .toString() function
        //below to accept the argument 'hex'
        const bufferedCipherText = Buffer.from(ciphertext)

        //stringifies cipher text
        const stringifiedCipherText = bufferedCipherText.toString('hex');       

        //queries for insertion of iv, encrypted email and wrapped key into database
        const insertQuery ='INSERT INTO encryption_data (iv, encrypted_email, wrapped_key) VALUES ($1, $2, $3) RETURNING *;'
        const insertArgument = [stringifiedIv, stringifiedCipherText, stringifiedWrappedKey]  
        
        
        //insert iv as string into database
        const inputData = await sql.query(insertQuery, insertArgument)
        const {iv: retrievedIv, encrypted_email: retrievedStringifiedCipher, wrapped_key: retrievedStringifiedWrappedKey } = inputData.rows[0];
        
        //transforms stringified cipher text back into buffer, note 'hex' must tally above and below
        const bufferisedRetrievedCipher = Buffer.from(retrievedStringifiedCipher, 'hex')        

        //transforms retrieved stringified wrapped key back into a buffer
        const bufferisedRetrievedWrappedKey = Buffer.from(retrievedStringifiedWrappedKey, 'hex')

        //import private key
        const mdnImportedPrivateKey = await importPrivateRsaKeyMdn(privateKey)
        
        //bufferise retrieved iv
        const rebufferisedRetrievedIv = Buffer.from(retrievedIv, "hex")

        //unwrap using imported private key
        const unwrappedKey = await unwrapKey(bufferisedRetrievedWrappedKey, mdnImportedPrivateKey)
        
        //symmetric decryption         
        const decryptedData = await aesDecrypt(bufferisedRetrievedCipher, unwrappedKey, rebufferisedRetrievedIv)
        
        //log results symmteric decryption
        console.log('decryptedData', decryptedData)
        

  } catch (error) {
    throw new Error;
  }
}

/*
function to concept test the use of rsa public and private keys from strings stored in env vars
*/

export const testingStringKeys = async() => {

  const keyPair = await generateRsaKeyPair();

  //exports public key
  const exportedPublicKey = await exportCryptoKey(keyPair.publicKey)

  //export private key
  const exportedPrivateKey = await exportPrivateCryptoKeyMdn(keyPair.privateKey)

  console.log('exported public key')

  console.log(exportedPublicKey)

  console.log('exported private key')

  console.log(exportedPrivateKey)
}


import { pbkdf2 } from 'node:crypto'


export const hashEmail = (email: string, salt?: string) => {
  //const salt = crypto.randomBytes(16);
  const saltToPass = salt ? salt : require('crypto').randomBytes(16).toString('hex');
  
  const bufferisedEmail = Buffer.from(email, 'utf8')
  
  const hashedEmail = require('crypto').pbkdf2Sync(bufferisedEmail, saltToPass, 100000, 64, 'sha512')

  //console.log(hashedEmail)
  //return {hashedEmail: hashedEmail, saltToPass: saltToPass};
  return hashedEmail;

}

export const testHashedEmailAgainstDatabase = async(email: string) => {

  const testSalt = '12843hdryfhgj78y'
  const firstHashedEmail = hashEmail(email, testSalt);
  const bufferisedTestSalt = Buffer.from(testSalt)
  
  const id = 'b1f07924-83ff-43bf-a575-0e6883f9dfed'
  const query = 'UPDATE encryption_data SET hashed_email = $1, email_salt = $2 WHERE id = $3 RETURNING hashed_email, email_salt;'
    
  const argument = [firstHashedEmail, testSalt, id]

  try {
    
    const data = await sql.query(query, argument);
    
    const {hashed_email: retrievedHash, email_salt: retrievedSalt} = data.rows[0];
    console.log('made it here')
    //const secondHashedEmail = hashEmail(email, testSalt);
    console.log(retrievedSalt)
    const retrievedSaltString = retrievedSalt.toString("hex")
    console.log('and here')
    const secondHashedEmail = hashEmail(email, retrievedSalt);
    
    console.log(require('crypto').timingSafeEqual(retrievedHash, secondHashedEmail))

  } catch (error){
    throw new Error;
  }

}

//export const writeHashToDatabase

export const testHashEmail = async(email: string) => {
  const firstHash = hashEmail(email).toString("hex")
  
  const secondHash = hashEmail(email).toString("hex")
  
  console.log('comparing same email with two different randomly generated salts, should false')
  console.log(firstHash === secondHash);

  const testSalt = '12843hdryfhgj78y'
  const thirdHash = hashEmail(email, testSalt)//.toString("hex")
  console.log(typeof thirdHash)
  console.log(thirdHash)
  const fourthHash = hashEmail(email, testSalt)//.toString("hex")
  console.log(thirdHash)
  console.log('comparing same email with same salt, should true')
  console.log(thirdHash === fourthHash)
  console.log(require('crypto').timingSafeEqual(thirdHash, fourthHash))
}

export const testDriveStringKeys = async(email) => {

  const privateKey = process.env.PRIVATE_KEY;
  const publicKey = process.env.PUBLIC_KEY;

  try {
        const encryptedData = await aesEncrypt(email)

        console.log('encrypted message: ', encryptedData.ciphertext);        

        //entracts components from encrypted data
        const { ciphertext, key, iv } = encryptedData;

        //imports public key
        const importedPublicKey = await importRsaPublicKey(publicKey)
        

        //wraps aes symmetrical encryption key with public rsa key - POINT A
        const wrappedKey = await subtle.wrapKey('raw', key, importedPublicKey, 'RSA-OAEP');

        console.log('got here')
        //import private key
        const importedPrivateKey = await importPrivateRsaKeyMdn(privateKey)

        console.log('but not here')
        
        //unwrap using imported private key
        const unwrappedKey = await unwrapKey(wrappedKey, importedPrivateKey)

        //symmetric decryption 
        const decryptedData = await aesDecrypt(ciphertext, unwrappedKey, iv)

        console.log('decryptedData', decryptedData)

  } catch (error){
    throw new Error
  }
  
  

}