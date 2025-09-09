//not too mysterious really - accepts the stored timestamp as the only argument and compares
//it against the current time and date, returns false if the timestamp is older than one hour
export const dateCompare = (storedDate: number) => {

    const currentDate: number = Date.now()

    const differenceInMilliseconds = currentDate - storedDate;
    
    const differenceInHours = differenceInMilliseconds / 3600000;
    
    if (differenceInHours > 1){
        return false;
    } else {
        return true;
    }
}