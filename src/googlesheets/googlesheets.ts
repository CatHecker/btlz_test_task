import { google } from "googleapis";

export async function googleSheetFn(auth: any, spreadsheetId: string, range: string, values: string[][]) {
    const sheets = google.sheets({ version: "v4", auth });
    const requestBody = {
        values,
    };
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody,
    });
}


