import cron from "node-cron";
import knex from "#postgres/knex.js";
import { get_coeffs } from "./api.js";
import { updateGoogleSheet } from "#googlesheets/update_sheets.js";

export function updateInfoIntoPg() {
    cron.schedule("0 * * * *", async () => {
        let daysAgo = 0
        const tariffs = await get_coeffs(daysAgo);
        try {
            if (tariffs && tariffs.response && tariffs.response.data) {
                for (let tariff of tariffs.response.data.warehouseList) {
                    let day = new Date();
                    day.setDate(day.getDate() - daysAgo);
                    let dayStr = day.toISOString().split("T")[0]
                    const boxDeliveryAndStorageExpr = parseFloat(tariff.boxDeliveryAndStorageExpr.replace(',', '.'));
                    const boxDeliveryBase = parseFloat(tariff.boxDeliveryBase.replace(',', '.'));
                    const boxDeliveryLiter = parseFloat(tariff.boxDeliveryLiter.replace(',', '.'));
                    const boxStorageBase = parseFloat(tariff.boxStorageBase.replace(',', '.'));
                    const boxStorageLiter = parseFloat(tariff.boxStorageLiter.replace(',', '.'));
    
                    await knex("spreadsheets")
                    .insert({
                        warehouseName: tariff.warehouseName,
                        boxDeliveryAndStorageExpr: boxDeliveryAndStorageExpr,
                        boxDeliveryBase: boxDeliveryBase,
                        boxDeliveryLiter: boxDeliveryLiter,
                        boxStorageBase: boxStorageBase,
                        boxStorageLiter: boxStorageLiter,
                        date: dayStr
                    })
                    .onConflict(["warehouseName", "date"])
                    .merge();
                }
                updateGoogleSheet()
            }
        } catch (error) {
            console.error("Error inserting tariff:", error);
        }
    });
}










