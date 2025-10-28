import { expect, describe, it } from 'vitest'
import { shuffle, locationParser } from '../app/lib/functions';
import { cleanUpUrl } from '../app/lib/authFunctions';

/*Tests various functions including:

shuffle
locationParser
cleanUpUrl

*/


//tests shuffle function in lib/functions
//the function is designed to shuffled the contents of an array, which is used to randomise the 
//sequence of multiple choice responses

describe('shuffle function', () => {
    it('tests shuffleFunction, shows that it shuffles contents of input array', () => {
        const testArray = ["1", "2", "3", "4"];
        const testArrayCopy = ["1", "2", "3", "4"];
        //shuffled array is not the same as input array
        expect(shuffle(testArray)).not.toBe(testArrayCopy);
        //shuffled array contains same number of elements as input array
        expect(testArray.length).toEqual(testArrayCopy.length);
        //shuffled array contains all components of input array
        for (let i = 0; i < testArray.length; i++){
            expect(testArrayCopy).toContain(testArray[i]);
        }
    })
})

/*
tests locationParser in lib/functions 
if no location param is passed, next will return the param as undefined, while TypeScript demands
that the value could be null
The function returns a string (rather than null / undefined) no matter what, the same string if a string
is passed and an empty string ("") if anything else - including null / undefined - is passed
*/

describe('locationParser', () => {
    it('tests that locationParser outputs string if string passed in and empty string if null or undefined passed', () => {
        const testString = "IAmALocation"
        const testUndefined = undefined;
        const testNull = null;
        //test that if a string is input the same string is returned
        expect(locationParser(testString)).toBe(testString);

        //test that if undefined is input, an empty string is returned
        expect(locationParser(testUndefined)).toBe("");
        expect(locationParser(testUndefined)).not.toBeUndefined;

        //test that if null is input, an empty string is returned
        expect(locationParser(testNull)).toBe("");
        expect(locationParser(testNull)).not.toBeNull;

        //test that empty string is returned if argument other than null, defined or a string is passed
        expect(locationParser({object: "test object string"})).toBe("");

    })
})

/*tests locationParser in lib/functions
it debugs a problem with next-auth, which returns a callback url with a bug
*/

describe('cleanUpUrl', () => {
    it('tests that cleanUpUrl modifies the callbackUrl parameter to include only the callbackUrl and not the entire link', () => {

        const dirtyUrl = "http://localhost:3000/account/auth/callback/nodemailer?callbackUrl=http://localhost:3000/account/auth/callback/nodemailer?callbackUrl=%2Faccount%3Flocation%3D%2Fflashcards%2F%2Ftopic%2F%2Fset&token=cdd16e840fe2445194cca0757dd1d39cb7351da2add6ffd27024bf687148e21b&email=tammihusband%40gmail.com"
        const cleanedUrl = "http://localhost:3000/account/auth/callback/nodemailer?callbackUrl=%2Faccount%3Flocation%3D%2Fflashcards%2F%2Ftopic%2F%2Fset&token=cdd16e840fe2445194cca0757dd1d39cb7351da2add6ffd27024bf687148e21b&email=tammihusband%40gmail.com"

        //test that passing dirtyUrl returns cleanedUrl
        expect(cleanUpUrl(dirtyUrl)).toBe(cleanedUrl);
    })
})