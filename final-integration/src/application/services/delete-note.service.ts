// T038: Skeleton delete note service
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
import { AuthorizationContext } from "../../domain/security/roles";

@Injectable()
export class DeleteNoteService {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepositoryPort,
    @Inject(AUTHORIZATION_PORT) private readonly authz: AuthorizationPort
  ) {}

  async execute(id: string, ctx: AuthorizationContext): Promise<void> {
    const existing = await this.notes.findById(id);
    if (!existing) throw new NotFoundException("NOTE_NOT_FOUND");
    if (!this.authz.canDelete(ctx, existing)) throw new ForbiddenException();
    await this.notes.delete(id);
  }
}
