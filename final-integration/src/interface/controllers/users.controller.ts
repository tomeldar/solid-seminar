// T040: UsersController skeleton
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Inject,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from "../../domain/ports/user-repository.port";
import { DEFAULT_ROLE } from "../../domain/security/roles";

@Controller("users")
export class UsersController {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepositoryPort
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.users.create({
      name: dto.name,
      email: dto.email,
      role: dto.role || DEFAULT_ROLE,
    });
    return user;
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException("USER_NOT_FOUND");
    return user;
  }
}
