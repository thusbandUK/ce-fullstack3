import { appendFile } from 'node:fs';

export const loggingExperiment = (stringToLog: string) => {
    appendFile('authLog.txt', stringToLog, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    })
}

