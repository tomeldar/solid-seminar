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

  get(): Promise<UserEntity[]> {
    return Promise.reject(new Error('Method not implemented.'));
  }

  save(user: UserEntity): Promise<void> {
    void user;
    return Promise.reject(new Error('Method not implemented.'));
  }

  delete(id: UUID): Promise<void> {
    void id;
    return Promise.reject(new Error('Method not implemented.'));
  }
}
