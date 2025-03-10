import { googleSheetFn } from './googlesheets.js';
import env from "#config/env/env.js";
import { google } from 'googleapis';
import knex from "#postgres/knex.js";

export async function updateGoogleSheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials2.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const spreadsheetId = env.SPREADSHEET_ID
  const countStrings = await knex('spreadsheets').count('* as count');
  const range = `stocks_coefs!A1:H${countStrings[0].count}`; 

  const tariffs = await knex('spreadsheets').orderBy('boxDeliveryAndStorageExpr', 'asc');
//
  const values = tariffs.map(tariff => [
    tariff.warehouseName,
    tariff.boxDeliveryAndStorageExpr,
    tariff.boxDeliveryBase,
    tariff.boxDeliveryLiter,
    tariff.boxStorageBase,
    tariff.boxStorageLiter,
    tariff.date,
  ]);

  await googleSheetFn(client, spreadsheetId, range, values);
}