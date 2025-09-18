import { Pool, PoolConfig } from 'pg';

let _pool: Pool | undefined;

export function getPgPool(): Pool {
  if (_pool) return _pool;
  const config: PoolConfig = {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD,
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
    max: process.env.PGPOOL_MAX ? parseInt(process.env.PGPOOL_MAX, 10) : 10,
  };
  _pool = new Pool(config);
  return _pool;
}

export function createPgPool(config: PoolConfig): Pool {
  return new Pool(config);
}

export async function disposePgPool(): Promise<void> {
  if (_pool) {
    const p = _pool;
    _pool = undefined;
    await p.end().catch(() => undefined);
  }
}
