import { initSnapshotTestManager, SnapshotTestManager } from 'src/infrastructure/testing/test-db.snapshot';
import { PgUserRepository } from './user.repository.pg';
import { Kysely } from 'kysely';

describe('PgUserRepository (pg)', () => {
  let snapshotManager: SnapshotTestManager;
  let db: Kysely<any>; // replace with typed DB once repository implemented
  let currentIsolated: { dispose: () => Promise<void> } | null = null;

  beforeAll(async () => {
    snapshotManager = await initSnapshotTestManager();
  });

  afterAll(async () => {
    await snapshotManager.shutdown();
  });

  beforeEach(async () => {
    const isolated = await snapshotManager.getIsolatedDb();
    currentIsolated = isolated;
    db = isolated.kysely;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const repo = new PgUserRepository(db);
  });

  afterEach(async () => {
    if (currentIsolated) {
      await currentIsolated.dispose();
      currentIsolated = null;
    }
  });

  it.todo('should save a new user');
  it.todo('should retrieve a user by id');
  it.todo('should list users');
  it.todo('should soft delete a user');
  it.todo('should enforce uniqueness on username and email');
});
