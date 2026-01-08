import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import { appendFile } from 'node:fs';
import { promisify } from 'node:util';

export const loggingExperiment = async (stringToLog: string) => {
    appendFile('authLog.txt', stringToLog, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    })
    return
}

export type SignUpInfoLog = {
  ipAddressToLog: string;
  userIdToLog: string;
  timeToLog: Date;
  ipAddressCode: string;
}

export const exampleUserLogObject = {
    ipAddressToLog: "ip address",
    userIdToLog: "user id",
    timeToLog: new Date(),
    ipAddressCode: "ip address code"
}

export const signUpIpAddressLog = async (signUpInfoLogObject: SignUpInfoLog) => {

    const {ipAddressToLog, userIdToLog, timeToLog, ipAddressCode } = signUpInfoLogObject;

    const stringToLog = `\n
      User login at time: ${timeToLog}
      IP address: ${ipAddressToLog}
      IP address code: ${ipAddressCode}
      User ID: ${userIdToLog}
    `

    const newAppendFile = promisify(appendFile);
    try {      
      newAppendFile('authLog.txt', stringToLog)

      return {success: true}
    } catch (error){
      console.error(error)
      return {error: true}
    }
}

