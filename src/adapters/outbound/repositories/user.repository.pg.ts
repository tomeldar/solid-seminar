import { Kysely } from 'kysely';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UUID } from 'src/domain/value-objects/uuid.vo';
import type { IUserRepository } from '../../../domain/ports/user.repository';
import { DB } from '../../../infrastructure/database/kysely';

export class PgUserRepository implements IUserRepository {
  constructor(private readonly db: Kysely<DB>) {}

  async getById(id: UUID): Promise<UserEntity | null> {
    return Promise.reject(new Error('Method not implemented.'));
  }

  async get(): Promise<UserEntity[]> {
    const users = await this.db.selectFrom('users').selectAll().execute();
    return users.map(
      (user) =>
        new UserEntity(
          {
            id: user.id,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
          },
          {
            username: user.username,
            email: user.email,
          },
        ),
    );
  }

  async save(user: UserEntity): Promise<void> {
    await this.db
      .insertInto('users')
      .values({
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deleted_at: null,
      })
      .execute();
  }

  delete(id: UUID): Promise<void> {
    void id;
    return Promise.reject(new Error('Method not implemented.'));
  }
}
