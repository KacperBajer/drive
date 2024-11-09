import { Pool } from "pg";

let conn: Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER as string,
    password: process.env.PGSQL_PASSWORD as string,
    host: process.env.PGSQL_HOST as string,
    port: parseInt(process.env.PGSQL_PORT as string, 10),
    database: process.env.PGSQL_DATABASE as string,
  });
}

export default conn;
