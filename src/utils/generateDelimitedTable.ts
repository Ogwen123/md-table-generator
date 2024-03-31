import { AlertSeverity } from "../exports/types"

export function generateDelimitedTable(csvString: string, delimiter: string, doAlert: (content: string[], severity: AlertSeverity) => void): string | [boolean, string] {
    const csvRows = csvString.split("\n")
    if (csvString === "") {
        doAlert(["No Data", "Enter CSV data to convert!"], "warning")
    }
    //find longest item in each column to make the seperators straight
    let longestFields = Array(csvRows[0].split(delimiter).length).fill(0)
    let longestRowLength = 0
    for (let i = 0; i < csvRows.length; i++) {
        const fieldArray = csvRows[i].split(delimiter)
        for (let j = 0; j < fieldArray.length; j++) {
            if (fieldArray[j].length > longestFields[j]) {
                longestFields[j] = fieldArray[j].length
            }
        }
        if (i === 0) {
            longestRowLength = fieldArray.length
        }
        if (fieldArray.length > longestRowLength) {
            return [false, "All columns should have the same number of fields."]
        }
    }

    //make table headers
    let csvHeaders = ""
    const headerArray = csvRows[0].split(delimiter)

    for (let i = 0; i < headerArray.length; i++) {
        csvHeaders += "|" + headerArray[i].padEnd(longestFields[i])
    }
    csvHeaders += "|"

    let headerSeperator = ""
    for (let i = 0; i < headerArray.length; i++) {
        headerSeperator += "|" + "-".padEnd(longestFields[i], "-")
    }
    headerSeperator += "|"

    //make table body
    const csvRowsArray = [csvHeaders, headerSeperator]
    for (let i = 0; i < csvRows.length - 1; i++) {
        const fieldArray = csvRows[i + 1].split(delimiter)//plus 1 because of the header row
        let rowString = ""
        for (let j = 0; j < fieldArray.length; j++) {
            rowString += ("|" + fieldArray[j].padEnd(longestFields[j]))
        }
        csvRowsArray.push(rowString + "|")
    }

    return csvRowsArray.join("\n")
}