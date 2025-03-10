/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    const exists = await knex("spreadsheets").where({ warehouseName: "testWarehouse" }).first();

    if (!exists) {
        await knex("spreadsheets").insert([
            {
                warehouseName: "testWarehouse",
                boxDeliveryAndStorageExpr: 0,
                boxDeliveryBase: 0,
                boxDeliveryLiter: 0,
                boxStorageBase: null,
                boxStorageLiter: null,
            },
        ]);
    }
}
