import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/user.dtos';
import { UUID } from '../../domain/value-objects/uuid.vo';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  getUsers(): UserResponseDto[] {
    throw new Error('Method not implemented.');
  }

  getUserById(id: UUID): UserResponseDto {
    void id;
    throw new Error('Method not implemented.');
  }

  createUser(email: string, username: string): UserResponseDto {
    void email;
    void username;
    throw new Error('Method not implemented.');
  }

  deleteUser(id: UUID): void {
    void id;
    throw new Error('Method not implemented.');
  }
}
