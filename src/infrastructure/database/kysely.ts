import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { getPgPool } from './pg.pool';
import { UserTable } from './schema/users.table';

export interface DB {
  users: UserTable;
}

let _kysely: Kysely<DB> | undefined;

export function getKysely(): Kysely<DB> {
  if (_kysely) return _kysely;
  const pool = getPgPool();
  _kysely = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool,
    }),
  });
  return _kysely;
}

export function createKyselyFromPool(pool: Pool): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new PostgresDialect({ pool }),
  });
}

export async function disposeKysely(): Promise<void> {
  if (_kysely) {
    const k = _kysely;
    _kysely = undefined;
    await k.destroy();
  }
}
