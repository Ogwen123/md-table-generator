import { Config } from "../exports/types";
import configFile from "../config/table.json";

export function generateCustomTable(tableConfig: Config): string[] {
    const rows = tableConfig.rows;
    const columns = tableConfig.columns;
    //make the seperators
    let headerSeperator: string = "-";
    let whiteSpace: string = " ";
    for (let i = 0; i < configFile.defaultCloumnWidth - 1; i++) { headerSeperator += "-"; whiteSpace += " " }
    const rowArray: string[] = []
    for (let i = 0; i < rows + 2; i++) {//plus 2 because of header row and header seperator row
        const tempRowArray: string[] = []
        for (let j = 0; j < columns; j++) {
            if (i === 1) {// if header seperator row
                tempRowArray.push("|" + headerSeperator)
            } else {
                tempRowArray.push("|" + whiteSpace)
            }
        }
        rowArray.push(tempRowArray.join(""))
    }
    for (let i = 0; i < rows + 2; i++) {//add the end pipe
        rowArray[i] = rowArray[i] + "|"
    }
    return rowArray
}