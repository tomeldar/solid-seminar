import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/user.dtos';
import { UUID } from '../../domain/value-objects/uuid.vo';
import { UserEntity } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY.valueOf())
    private readonly userRepository: IUserRepository,
  ) {}

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.get();
    if (users) {
      return users.map(
        (user) =>
          new Object({
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            username: user.username,
            email: user.email,
          }) as UserResponseDto,
      );
    }
    return users;
  }

  getUserById(id: UUID): UserResponseDto {
    void id;
    throw new Error('Method not implemented.');
  }

  async createUser(email: string, username: string): Promise<UserResponseDto> {
    const user = new UserEntity({ id: new UUID() }, { email, username });

    await this.userRepository.save(user);

    return {
      id: user.id.toString(),
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  deleteUser(id: UUID): void {
    void id;
    throw new Error('Method not implemented.');
  }
}
