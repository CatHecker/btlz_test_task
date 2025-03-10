import { migrate, seed } from "#postgres/knex.js";
import { updateInfoIntoPg } from "#wb_api/update_pg_info.js";
await migrate.latest();
await seed.run();

updateInfoIntoPg()
console.log("All migrations and seeds have been run");