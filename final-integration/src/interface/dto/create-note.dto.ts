// T039: CreateNoteDto
import { IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  title!: string;
  @IsString()
  content!: string;
  @IsString()
  authorId!: string;
}
