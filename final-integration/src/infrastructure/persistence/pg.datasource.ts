// T031: PostgreSQL datasource singleton helper
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

let pool: Pool | undefined;

export function getPgPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL || "postgres://solid:solid@localhost:5432/solid";
    pool = new Pool({ connectionString });
  }
  return pool;
}

export async function closePgPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
