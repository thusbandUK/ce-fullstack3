import { expect, describe, it, vi } from 'vitest'
import { shuffle, locationParser } from '../app/lib/functions';
import { cleanUpUrl } from '../app/lib/authFunctions';
import { colourManagement } from './colourManagementFunctionCopy'
import { ColourManagementClass, TimeoutClass } from '../app/animation/animationFunctions';

/*Tests various functions including:

shuffle
locationParser
cleanUpUrl
colourManagement
ColourManagementClass

*/
//tests TimeoutClass
describe('TimeoutClass', () => {
    it('tests functions of instance of TimeoutClass', () => {
        const timeoutInstance = new TimeoutClass;
        //initial value of timeout is 25
        expect(timeoutInstance.getTimeout).toBe(25)
        //increment timeout adds the value passed to the existing value
        timeoutInstance.incrementTimeout = 25
        expect(timeoutInstance.getTimeout).toBe(50)
        //timeoutUpdate method returns the value produced when the existing time value is incremented by the value passed
        expect(timeoutInstance.timeoutUpdate(50)).toBe(100)
        //sets the value of timeout to the value passed
        timeoutInstance.setTimeout = 25
        expect(timeoutInstance.getTimeout).toBe(25)
        
    })
})
//tests ColourManagementClass
describe('ColourManagementClass', () => {
    it('tests ColourManagementClass, shows that separate instances each output the four colours once each when called four times', () => {
        const colourSet: string[] = ['#F28972', '#F2C48D', '#D98FBF', '#8268A6']
        const instance1 = new ColourManagementClass;
        const instance2 = new ColourManagementClass;

        const testColourSelectorInstance1 = vi.fn(() => {
            return instance1.objectColourSelector()
        })
        const testColourSelectorInstance2 = vi.fn(() => {
            return instance2.objectColourSelector()
        })
        let n = 0
        while (n < 4){
            n++
            testColourSelectorInstance1()
        }
        let m = 0
        while (m < 4){
            m++
            testColourSelectorInstance2()
        }
        expect(testColourSelectorInstance1).toHaveReturnedTimes(4)
        expect(testColourSelectorInstance2).toHaveReturnedTimes(4)
        colourSet.forEach((x: string) => {
            expect(testColourSelectorInstance1).toHaveReturnedWith(x)
            expect(testColourSelectorInstance2).toHaveReturnedWith(x)
        })
    })
})

//tests colourManagement
describe('colourManagement function', () => {
    it('tests colourManagement, shows sequentially outputs the four colours in a random sequence but each once per four colours in total', () => {
        const colourSet: string[] = ['#F28972', '#F2C48D', '#D98FBF', '#8268A6']
        const testColourSelector = vi.fn(() => {
            return colourManagement.objectColourSelector()
        })
        testColourSelector()
        expect(colourManagement.objectUsedColours.length).toBe(1);
        expect(colourManagement.objectRemainingColours.length).toBe(3);
        testColourSelector()
        expect(colourManagement.objectUsedColours.length).toBe(2);
        expect(colourManagement.objectRemainingColours.length).toBe(2);
        testColourSelector()
        expect(colourManagement.objectUsedColours.length).toBe(3);
        expect(colourManagement.objectRemainingColours.length).toBe(1);
        testColourSelector()        
        expect(testColourSelector).toHaveReturnedTimes(4)
        expect(testColourSelector).toHaveReturnedWith(colourSet[0])
        expect(testColourSelector).toHaveReturnedWith(colourSet[1])
        expect(testColourSelector).toHaveReturnedWith(colourSet[2])
        expect(testColourSelector).toHaveReturnedWith(colourSet[3])        
    })
})

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