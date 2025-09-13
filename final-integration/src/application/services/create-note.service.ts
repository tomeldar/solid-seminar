// T035: Skeleton create note service
import {
  NOTE_REPOSITORY,
  NoteRepositoryPort,
} from "../../domain/ports/note-repository.port";
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from "../../domain/ports/user-repository.port";
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateNoteInput, Note } from "../../domain/entities/note";

@Injectable()
export class CreateNoteService {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepositoryPort,
    @Inject(USER_REPOSITORY) private readonly users: UserRepositoryPort
  ) {}

  async execute(input: CreateNoteInput): Promise<Note> {
    if (!input.title?.trim()) throw new BadRequestException("TITLE_REQUIRED");
    if (!input.content?.trim())
      throw new BadRequestException("CONTENT_REQUIRED");
    const user = await this.users.findById(input.authorId);
    if (!user) throw new NotFoundException("AUTHOR_NOT_FOUND");
    return this.notes.create(input);
  }
}
