// T036: Skeleton update note service
import {
  NOTE_REPOSITORY,
  NoteRepositoryPort,
} from "../../domain/ports/note-repository.port";
import {
  AUTHORIZATION_PORT,
  AuthorizationPort,
} from "../../domain/ports/authorization.port";
import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { UpdateNoteInput, Note } from "../../domain/entities/note";
import { AuthorizationContext } from "../../domain/security/roles";

@Injectable()
export class UpdateNoteService {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepositoryPort,
    @Inject(AUTHORIZATION_PORT) private readonly authz: AuthorizationPort
  ) {}

  async execute(
    id: string,
    input: UpdateNoteInput,
    ctx: AuthorizationContext
  ): Promise<Note> {
    const existing = await this.notes.findById(id);
    if (!existing) throw new NotFoundException("NOTE_NOT_FOUND");
    if (!this.authz.canEdit(ctx, existing)) throw new ForbiddenException();
    const updated = await this.notes.update(id, input);
    if (!updated) throw new NotFoundException("NOTE_NOT_FOUND");
    return updated;
  }
}
