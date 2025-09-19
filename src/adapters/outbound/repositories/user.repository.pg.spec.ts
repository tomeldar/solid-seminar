import { setupDatabaseSnapshot } from '../../../infrastructure/testing/test-db.snapshot';
import { PgUserRepository } from './user.repository.pg';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from '../../../infrastructure/database/kysely';
import { Pool } from 'pg';

describe('PgUserRepository (pg)', () => {
  let db: Kysely<DB>;
  let repo: PgUserRepository;
  let snapshot: Awaited<ReturnType<typeof setupDatabaseSnapshot>>;
  let pgContainer: Awaited<ReturnType<typeof setupDatabaseSnapshot>>['pgContainer'];

  // beforeAll(async () => {
  //   snapshot = await setupDatabaseSnapshot();
  //   ({ pgContainer } = snapshot);
  // });

  // afterAll(async () => {
  //   await pgContainer.stop();
  // });

  // beforeEach(async () => {
  //   await pgContainer.restoreSnapshot();
  //   db = new Kysely<DB>({
  //     dialect: new PostgresDialect({
  //       pool: new Pool(snapshot.connectionConfig),
  //     }),
  //   });

  //   repo = new PgUserRepository(db);
  // });

  // afterEach(async () => {
  //   await db.destroy();
  // });

  it.todo('should save a new user');
  // it.todo('should retrieve a user by id');
  // it.todo('should list users');
  // it.todo('should soft delete a user');
  // it.todo('should enforce uniqueness on username and email');
});
