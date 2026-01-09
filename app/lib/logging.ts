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

/*class SuspiciousActivityClass {
  constructor(clientIpAddress: string, nameFunction: string, suspiciousContent: string, userLoggedIn: boolean, userId: string, ipAddressCode: string, sessionId: string) {
    this.clientIpAddress = clientIpAddress;
    this.nameFunction = nameFunction;
    this.suspiciousContent = suspiciousContent;
    this.userLoggedIn = userLoggedIn;
    this.userId = userId;
    this.ipAddressCode = ipAddressCode;
    this.sessionId = sessionId;
  }

}*/

/*
clientIpAddress string
function called nameOfFunction string
suspicious content string
session? userLoggedOn boolean
userId ? userId : 'no user logged on'
ipAddressCode 
time

the logging function could have two parameters: function name and information passed
THEN in the function heads is called and session / Ip address extracted*/

import { headers } from "next/headers";
import { getClientIpAddress } from './data';
import { auth } from '../../auth';
import { sendMail } from './send-mail';

export const logSuspiciousActivity = async(suspiciousContent: string, affectedFunction: string) => {

  const ipAddress = await getClientIpAddress()
  const currentTime = new Date()

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  const stringToLog = `\n
    ### SUSPICIOUS ACTIVITY ###
    time: ${currentTime}
    client ip address: ${ipAddress}
    suspicious content: ${suspiciousContent}
    affected function: ${affectedFunction}
    user logged in?: ${session ? 'true' : 'false'},
    user id?: ${session ? session.user.id : 'no user id'},
    ip address code?: ${session ? session.session.ipAddress : 'no ip address code'}
    session id?: ${session ? session.session.id : 'no session id'}
  `
  const newAppendFile = promisify(appendFile);
    try {      
      newAppendFile('authLog.txt', stringToLog)
      await sendMail(
        {
          email: 'thsciencetutor@gmail.com',
          sendTo: 'thsciencetutor@gmail.com',
          subject: 'Suspicious activity',
          text: stringToLog,
          html: `<p>${stringToLog}</p>`
        }
      )  

      return {success: true}
    } catch (error){
      console.error(error)
      return {error: true}
    }
  
}