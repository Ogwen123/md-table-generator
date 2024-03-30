import { Config } from "../exports/types";
import configFile from "../config/table.json";

export function generateCustomTable(tableConfig: Config): string {
    const rows = tableConfig.rows;
    const columns = tableConfig.columns;

    //find longest item in each column to make the seperators straight
    const fieldLengths: number[] = Array(columns).fill(configFile.minColumnWidth)
    for (const key of Object.keys(tableConfig.content)) {
        const column: number = parseInt(key.split("-")[1])
        if (tableConfig.content[key].length > fieldLengths[column]) {
            fieldLengths[column] = tableConfig.content[key].length
        }
    }

    //check all the headers are filled - changed my mind, headers can be empty
    //for (let i = 0; i < columns; i++) {
    //    if (tableConfig.content[`0-${i}`] === "") {
    //        return [false, "All headers must be filled"]
    //    }
    //}

    const tableOutput: string[] = []
    //make header row
    let headerArray = []
    for (let i = 0; i < columns; i++) {
        if (tableConfig.content[`0-${i}`] === "") headerArray.push("|" + " ".padEnd(fieldLengths[i], " "))
        else headerArray.push("|" + tableConfig.content[`0-${i}`].padEnd(fieldLengths[i]))
    }
    tableOutput.push(headerArray.join("") + "|")

    //make header seperator
    let headerSeperatorArray: string[] = []
    for (let i = 0; i < columns; i++) {
        headerSeperatorArray.push("|" + "-".padEnd(fieldLengths[i], "-"))
    }
    tableOutput.push(headerSeperatorArray.join("") + "|")

    //make body
    for (let i = 0; i < rows - 1; i++) {
        let temptableOutput: string[] = []
        for (let j = 0; j < columns; j++) {
            const currentKey = `${i + 1}-${j}`
            if (tableConfig.content[currentKey] === "") temptableOutput.push("|" + " ".padEnd(fieldLengths[j], " "))
            else temptableOutput.push("|" + tableConfig.content[currentKey].padEnd(fieldLengths[j]))//add 2 top skip header
        }
        tableOutput.push(temptableOutput.join("") + "|")
    }
    //console.log(columns)
    return tableOutput.join("\n")
}