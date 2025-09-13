// T029: UserRepositoryPort
import { User, CreateUserInput } from "../entities/user";

export interface UserRepositoryPort {
  create(input: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
