/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("spreadsheets", (table) => {
        table.increments("id").primary();
        table.string("warehouseName");
        table.decimal("boxDeliveryAndStorageExpr");
        table.decimal("boxDeliveryBase");
        table.decimal("boxDeliveryLiter");
        table.decimal("boxStorageBase");
        table.decimal("boxStorageLiter");
        table.date("date").defaultTo(knex.fn.now());

        table.unique(["warehouseName", "date"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("spreadsheets");
}
