export const queryMaker = (listOfIds: string[]) => {
    let outputArray: string[] = [];
    for (let x = 0; x < (listOfIds.length - 1); x++){
        outputArray.push(`$${(x + 1).toString()}, `)
    }
    outputArray.push(`$${listOfIds.length}`);
    return outputArray.join("");
}