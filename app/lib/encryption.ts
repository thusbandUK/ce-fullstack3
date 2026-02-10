const { subtle } = globalThis.crypto;
//import { sql } from '@vercel/postgres';
import { pool } from './poolInstantiation';

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
/*
async function aesEncrypt(plaintext: string) {
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
*/
/* This takes care of the symmetric decryption
 */

async function aesDecrypt(ciphertext: ArrayBuffer, key: CryptoKey, iv: BufferSource) {
  const dec = new TextDecoder();
  const plaintext = await crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, ciphertext);

  return dec.decode(plaintext);
}

/*This turns as array buffer into a string*/
function ab2str(buf: ArrayBuffer) {
  return String.fromCharCode.apply(null, Array.from<number>(new Uint8Array(buf)));
}


//adapted from MDN docs provided importRsaKey2 in encryptionOffcuts
/* This just takes the key as a string and does not involve the headers or the base64 encoding
key as a string is an easier format to store in env variables
NOTE: this is specifically for the public key, based on the use cases, the private key will need
uses: decrypt and unwrap
 */
function importRsaPublicKey(keyAsString: string) {

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

/* Working system to import private key that is encoded in base64 (*not* pem formatted)
pem formatted means it has the header and the footer and this doesn't, it's just stored
as the actual key part of the pem format key
 */

export function importPrivateRsaKeyMdn(stringKey: string) {  
  
  // base64 decode the string to get the binary data
  const binaryDerString = atob(stringKey);
  
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

export const unwrapKey = async(wrappedKey: ArrayBuffer, unwrappingKey: CryptoKey) => {
  
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

//CHANGE 15-1-26
/*
takes the arrayBuffer for each unit of encryption (eg: email), then converts to a binaryString
then converts that into a base64 string which is returned, this is all for type safety
*/

function arrayBufferToBase64String (inputArrayBuffer: ArrayBuffer){
  const binaryString = ab2str(inputArrayBuffer);
  const base64String = btoa(binaryString)
  return base64String;
}

/*
Takes a string, key and iv and returns the aes symmetrically encrypted data as a base-64 encoded string
*/

export async function aesEncryptString(inputData: string, key: CryptoKey, iv: BufferSource){
  const ec = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(inputData));
  const stringifiedCiphertext = arrayBufferToBase64String(ciphertext)
  return stringifiedCiphertext;
}

/*
This receives name, email and image link, generates an IV and public key which will be used to encrypt
all three, then calls the above aesEncryptString() function to return their encrypted versions in 
base64-coded string format

The key point is that it accepts all of the data which will need encrypting and encrypts them all
with the same encryption key and IV, both of which are returned, along with the encrypted versions
of each data point

*/

async function aesEncryptUserData(name: string, email: string, image: string) {
  //const ec = new TextEncoder();
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(16)).buffer;

  const encryptedData = {
    name: '',
    email: '',
    image: ''
  }  

  if (name){
    encryptedData.name = await aesEncryptString(name, key, iv);    
  }

  if (email){
    encryptedData.email = await aesEncryptString(email, key, iv);    
  }

  if (image){
    encryptedData.image = await aesEncryptString(image, key, iv);
  }

  return {
    key,
    iv,
    encryptedData,
  };
}

/*

This 
1) receives name, email and image link in unencrypted form, along with newly generated user.id
2) encrypts name, email and image link
3) symmetrically encrypts with IV, which is stringified and written to encryptionData
4) wraps symmetrical encryption key with public key and writes the wrapped key to the database SEE CHANGE
5) writes the user.id as userId foreign key
6) returns encrypted name, email and image link for writing into the user table

CHANGE 15-1-26
wrappedKey is converted from an arrayBuffer, first into a binary string and then into a base64-coded
string, to facilitate type safety, using above arrayBufferToBase64String() function above

user.name, user.email, user.image
*/
type UserDataObject = {
  name: string;
  email: string;
  image: string;
  id: string;
}

export const encryptUserData = async(inputObject: UserDataObject) => {

  //extracts individual data points
  const {name, email, image, id} = inputObject;
  
  //imports public key
  const publicKey = process.env["PUBLIC_KEY"];

  try {

        //symmetrically encrypts data
        const encryptedDataKeyIv = await aesEncryptUserData(name, email, image)

        //entracts components from encrypted data
        const { encryptedData, key, iv } = encryptedDataKeyIv;
        
        //returns if no public key
        if (publicKey === undefined){
          return
        }

        //imports public key
        const importedPublicKey = await importRsaPublicKey(publicKey)
        
        //wraps aes symmetrical encryption key with public rsa key
        const wrappedKey = await subtle.wrapKey('raw', key, importedPublicKey, 'RSA-OAEP');

        //new method of string conversion for type safety implemented 15-1-26
        const stringifiedWrappedKey = arrayBufferToBase64String(wrappedKey)

        //make a buffer from iv to facilitate stringification below
        const bufferisedIv = Buffer.from(iv)        
        
        //stringify iv for storage in database
        const stringifiedIv = bufferisedIv.toString("hex")
        
        //queries for insertion of iv, encrypted email and wrapped key into database
        const insertQuery ='INSERT INTO encryption_data ("userId", iv, wrapped_key) VALUES ($1, $2, $3) RETURNING *;'
        const insertArgument = [id, stringifiedIv, stringifiedWrappedKey]
        
        const client = await pool.connect()
        //insert iv as string into database        
        await client.query(insertQuery, insertArgument)

        client.release()

        return encryptedData

  } catch (error) {
    throw new Error;
  }
}

/*
returns imported private key from env var
reads as string from env var but then imports and returns as CryptoKey
*/

export const privateKeyAsCryptoKey = async() => {

  //collects private key from env var
  const privateKey = process.env["PRIVATE_KEY"];

  //returns if no private key
  if (privateKey === undefined){
    return
  }
  //imports private key
  const importedPrivateKey = await importPrivateRsaKeyMdn(privateKey)

  return importedPrivateKey;
}

//INTRODUCED 15-1-26
/*
Had to change the way ciphers were transformed from arrayBuffer to string for type safety
the below function takes the (base-64-encoded) string returned from the db and transforms it
back into an array buffer
*/

const arrayBufferFromBase64String = (base64String: string) => {

  const binaryString = atob(base64String);

  const arrayBuffer = str2ab(binaryString)

  return arrayBuffer;
}

/*
takes the string version of the wrappedKey returned from the database, along with the imported 
CryptoKey version of the private key


CHANGE 15-1-26
for type safety, it had to be changed so that the string format received is base64, that is
then transformed into binary string format (by atob()), which is then transformed into 
arrayBuffer format by str2ab(), which is accomplished via the above arrayBufferFromBase64String()
function

THEN (as before) unwraps the key and returns the key ready for use as a Cryptokey

*/

export const unwrapStringifiedKey = async(stringifiedWrappedKey: string, privateKey: CryptoKey) => {

  //uses above function to transform string to array buffer
  const arrayBufferWrappedKey = arrayBufferFromBase64String(stringifiedWrappedKey);
  
  //unwraps key
  const unwrappedKey = await unwrapKey(arrayBufferWrappedKey, privateKey)

  return unwrappedKey;

}

/*
This takes the string in the database (from user object) along with the user.id and returns the 
decrypted string

CHANGE: 15-1-26 modified to call arrayBufferFromBase64String() (see above) to reflect new
logic for transformation between arrayBuffer and string
*/

export const decryptUserData = async(stringifiedEncryptedData: string, userId: string) => {

  const fetchWrappedKeyIvQuery = 'SELECT iv, wrapped_key FROM encryption_data WHERE "userId" = $1';
  const fetchWrappedKeyIvArgument = [userId];

  const privateKey = await privateKeyAsCryptoKey()

  //transforms stringified cipher text back into buffer, note 'hex' must tally above and below
  const bufferisedEncryptedData = arrayBufferFromBase64String(stringifiedEncryptedData)

  try {

     const client = await pool.connect()

     const retrievedWrappedKeyIv = await client.query(fetchWrappedKeyIvQuery, fetchWrappedKeyIvArgument)

     const {wrapped_key: wrappedKey, iv}: {wrapped_key: string, iv: string} = retrievedWrappedKeyIv.rows[0]

     if (privateKey === undefined){
      return
     }
     const unwrappedKey = await unwrapStringifiedKey(wrappedKey, privateKey)
     
     const bufferisedIv = Buffer.from(iv, 'hex')

     const decryptedData = await aesDecrypt(bufferisedEncryptedData, unwrappedKey, bufferisedIv)

     client.release()
     
     return decryptedData;


  } catch (error){
    throw new Error();
  }

}

/*
There are two functions which write the username to the database, signUpUser and updateUser (CHECK),
each of them should be able to call the below to encrypt the username, using the encryption keys
already created on first login 
so, it takes the user.id, user.encryptionData.id and username to encrypt
1) fetches private key
2) fetches wrappedKey and IV
3) unwraps key, rebufferises IV
4) encrypts username
5) returns encrypted username (username not written into database, that happens in other functions)
*/

export const encryptUsername = async(username: string, id: string) => {

  //collects private key from env var
  const privateKey = await privateKeyAsCryptoKey();

  //encryptionData query
  const queryForWrappedKeyIv = 'SELECT iv, wrapped_key FROM encryption_data WHERE "userId" = $1'
  const argumentForWrappedKeyIv = [id]

  try {

    const client = await pool.connect();

    const returnedKeyIv = await client.query(queryForWrappedKeyIv, argumentForWrappedKeyIv)  
    const { iv: returnedIv, wrapped_key: returnedWrappedKey} = returnedKeyIv.rows[0]  

    //bufferises returned IV
    const bufferisedReturnedIv = Buffer.from(returnedIv, 'hex')
  
    if (!privateKey){
      throw new Error('no private key')
    }
    //unwraps key returned from database
    const unwrappedKey = await unwrapStringifiedKey(returnedWrappedKey, privateKey)

    //encrypts username
    const encryptedUsername = await aesEncryptString(username, unwrappedKey, bufferisedReturnedIv)

    client.release()
    return encryptedUsername;

  } catch (error){
    console.log(error)
    throw new Error()
  }

}

/*
This accepts encrypted user data (id, name, email and image link) and overwrites the 
non-encrypted data in the user table
See below for what happens if it throws an error
*/


export const updateUserEncryptedData = async(user: UserDataObject) => {

  const {id, name, email, image} = user;

  const updateQuery = 'UPDATE "user" SET name = $1, email = $2, image = $3 WHERE id = $4;'
  const updateArguments = [name, email, image, id]

  try {

    const client = await pool.connect()

    await client.query(updateQuery, updateArguments)

    client.release()
    
    return {success: true}

  } catch (error){
    console.log(error)    
    return {error: true}
  }
}

/*
this accepts the user.id and uses it to delete the entry in the user table, which cascades
to delete all rows in all tables where user_id appears as a foreign key. 
it's called if the above function throws an error to reverse the entries already 
made in the db (user, encryption_data) before the signUp process is aborted
*/

export const abortUserCreation = async(userId: string) => {

  const deleteUserQuery = 'DELETE FROM "user" WHERE id = $1;'
  
  const argument = [userId]

  try {
    
    const client = await pool.connect();

    await client.query(deleteUserQuery, argument)

    client.release()
    
    return
  } catch (error){
    console.log(error);
    throw new Error();
  }

}