import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../../../application/services/user.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

class CreateUserRequestDto {
  @ApiProperty() @IsEmail() email!: string;
  @ApiProperty() @IsString() username!: string;
}

class GetUserByIdRequestDto {
  @ApiProperty() @IsUUID() id!: string;
}

class DeleteUserRequestDto {
  @ApiProperty() @IsUUID() id!: string;
}

class UserResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() email!: string;
  @ApiProperty() username!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
    let response = await this.userService.createUser(createUserDto.email, createUserDto.username);
    console.log(response);
    return response;
  }

  @Get(':id')
  getUserById(@Param() params: GetUserByIdRequestDto): UserResponseDto {
    throw new Error('Method not implemented.');
  }

  @Delete(':id')
  deleteUser(@Param() params: DeleteUserRequestDto): void {
    throw new Error('Method not implemented.');
  }
}
