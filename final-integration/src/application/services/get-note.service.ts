// T054: Get single note service
import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import {
  NOTE_REPOSITORY,
  NoteRepositoryPort,
} from "../../domain/ports/note-repository.port";
import {
  AUTHORIZATION_PORT,
  AuthorizationPort,
} from "../../domain/ports/authorization.port";
import { AuthorizationContext } from "../../domain/security/roles";
import { Note } from "../../domain/entities/note";

@Injectable()
export class GetNoteService {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepositoryPort,
    @Inject(AUTHORIZATION_PORT) private readonly authz: AuthorizationPort
  ) {}

  async execute(id: string, ctx: AuthorizationContext): Promise<Note> {
    const note = await this.notes.findById(id);
    if (!note) throw new NotFoundException("NOTE_NOT_FOUND");
    if (!this.authz.canView(ctx, note)) throw new ForbiddenException();
    return note;
  }
}
