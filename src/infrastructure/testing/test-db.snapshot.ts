import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { Kysely } from 'kysely';
import { Pool } from 'pg';
import { createKyselyFromPool } from '../database/kysely';
import { createPgPool } from '../database/pg.pool';
import path from 'node:path';
import fs from 'node:fs';

interface IsolatedDb {
  dbName: string;
  pool: Pool;
  kysely: Kysely<any>; // kept loose for now to avoid circular import complexity in test env
  dispose(): Promise<void>;
}

export interface SnapshotTestManager {
  getIsolatedDb(): Promise<IsolatedDb>;
  shutdown(): Promise<void>;
}

let baseContainer: StartedTestContainer | undefined;
let flywayImagePulled = false; // placeholder in case we extend logic later

export async function initSnapshotTestManager(): Promise<SnapshotTestManager> {
  if (!baseContainer) {
    // Start Postgres container (reuse flag for speed across test runs if supported)
    baseContainer = await new PostgreSqlContainer('postgres:16-alpine')
      .withDatabase('postgres')
      .withUsername('postgres')
      .withPassword('postgres')
      .withReuse()
      .start();

    // Run Flyway migrations once against base database
    await runFlywayMigrations(baseContainer);
  }

  return {
    async getIsolatedDb(): Promise<IsolatedDb> {
      // Strategy: create a new database inside existing Postgres container for each test.
      const dbName = `test_${Math.random().toString(36).slice(2, 10)}`;
      await execInContainer(baseContainer!, ['createdb', '-U', 'postgres', dbName]);

      // Apply migrations to the new database (flyway target database via JDBC URL)
      await runFlywayMigrations(baseContainer!, dbName);

      const host = baseContainer!.getHost();
      const port = baseContainer!.getMappedPort(5432);
      const pool = createPgPool({
        host,
        port,
        database: dbName,
        user: 'postgres',
        password: 'postgres',
      });
      const kysely = createKyselyFromPool(pool);

      return {
        dbName,
        pool,
        kysely,
        async dispose() {
          await pool.end().catch(() => undefined);
          await kysely.destroy().catch(() => undefined);
          // Drop database to free space
          await execInContainer(baseContainer!, ['dropdb', '-U', 'postgres', dbName]).catch(() => undefined);
        },
      };
    },
    async shutdown() {
      if (baseContainer) {
        await baseContainer.stop();
        baseContainer = undefined;
      }
    },
  };
}

async function runFlywayMigrations(container: StartedTestContainer, database = 'postgres') {
  // Pull flyway image only once
  if (!flywayImagePulled) {
    flywayImagePulled = true;
  }
  const migrationsDir = path.resolve(process.cwd(), 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    throw new Error('Migrations directory not found at ' + migrationsDir);
  }

  const networkHost = container.getHost();
  const mappedPort = container.getMappedPort(5432);
  const jdbcUrl = `jdbc:postgresql://${networkHost}:${mappedPort}/${database}`;

  // Mount migrations directory read-only into flyway container at /flyway/sql
  const flywayContainer = await new GenericContainer('flyway/flyway:10-alpine')
    .withBindMounts([{ source: migrationsDir, target: '/flyway/sql', mode: 'ro' }])
    .withEnvironment({
      FLYWAY_URL: jdbcUrl,
      FLYWAY_USER: 'postgres',
      FLYWAY_PASSWORD: 'postgres',
      FLYWAY_LOCATIONS: 'filesystem:/flyway/sql',
      FLYWAY_BASELINE_ON_MIGRATE: 'true',
    })
    .withCommand(['-connectRetries=5', 'migrate'])
    .start();

  await flywayContainer.stop();
}

async function execInContainer(container: StartedTestContainer, command: string[]) {
  const result = await container.exec(command);
  if (result.exitCode !== 0) {
    throw new Error(`Command failed: ${command.join(' ')}\n${result.output}`);
  }
  return result;
}
