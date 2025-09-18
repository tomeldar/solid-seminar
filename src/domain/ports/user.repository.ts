import { UserEntity } from '../entities/user.entity';
import { UUID } from '../value-objects/uuid.vo';

export interface IUserRepository {
  getById(id: UUID): Promise<UserEntity | null>;
  get(): Promise<UserEntity[]>;
  save(user: UserEntity): Promise<void>;
  delete(id: UUID): Promise<void>;
}

// NestJS injection token to decouple interface from implementation
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
