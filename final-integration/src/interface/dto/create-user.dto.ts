// T039: CreateUserDto
import { IsEmail, IsOptional, IsString } from "class-validator";
import { UserRole } from "../../../domain/security/roles";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  role?: UserRole;
}
