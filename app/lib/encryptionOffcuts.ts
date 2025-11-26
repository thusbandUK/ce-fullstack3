//imports public from pem
//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey

function importRsaKey2(pem) {
    console.log('importedRsaKey called')
    console.log('pem')
    console.log(pem)
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length - 1,
    );
    console.log('pemContents')
    console.log(pemContents)
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);
    console.log('binaryDerString')
    console.log(binaryDerString)
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

  //exports key in pem format, which basically means it has the PUBLIC key starts / ends header and footer
//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#subjectpublickeyinfo_export
async function exportCryptoKey2(key) {
  
    const exported = await subtle.exportKey("spki", key);
    
    const exportedAsString = ab2str(exported);
    
    const exportedAsBase64 = btoa(exportedAsString);
    
    const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
    
    return pemExported
  }

  //const { subtle } = globalThis.crypto;
const publicExponent = new Uint8Array([1, 0, 1]);

async function generateRsaKey(modulusLength = 2048, hash = 'SHA-256') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'RSASSA-PKCS1-v1_5',
    //name: 'RSA-OAEP',
    modulusLength,
    publicExponent,
    hash,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}

async function rsaDecrypt(ciphertext, privateKey) {
    const dec = new TextDecoder();
    const plaintext = await crypto.subtle.decrypt({
      name: 'RSA-OAEP',
      //iv,
    }, privateKey, ciphertext);
  
    return dec.decode(plaintext);
  }

  async function rsaEncrypt(keyToEncrypt, publicKey) {
    
    const ec = new TextEncoder();
    
    const ciphertext = await subtle.encrypt({
        name: 'RSA-OAEP'
    }, publicKey, ec.encode(keyToEncrypt))
  
    return {
      publicKey,
      ciphertext,
    };
  }

  
function getMessageEncoding(messageToEncrypt) {
    //const messageBox = document.querySelector(".rsa-oaep #message");
//    let message = messageToEncrypt.value;
    let enc = new TextEncoder();
    return enc.encode(messageToEncrypt);
  }


