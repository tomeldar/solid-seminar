// T034: Skeleton authorization service implementing AuthorizationPort
import { AuthorizationPort } from "../../domain/ports/authorization.port";
import { Note } from "../../domain/entities/note";
import {
  AuthorizationContext,
  canDeleteNote,
  canEditNote,
  canViewNote,
  UserRole,
} from "../../domain/security/roles";

export class AuthorizationService implements AuthorizationPort {
  canView(ctx: AuthorizationContext, note: Note): boolean {
    // All roles can view for now; placeholder for future visibility rules.
    return true;
  }
  canEdit(ctx: AuthorizationContext, note: Note): boolean {
    if (ctx.actorRole === UserRole.ADMIN) return true;
    if (ctx.actorRole === UserRole.INSTRUCTOR) return true;
    return ctx.actorId === note.authorId;
  }
  canDelete(ctx: AuthorizationContext, note: Note): boolean {
    if (ctx.actorRole === UserRole.ADMIN) return true;
    // Only author (or admin) can delete
    return ctx.actorId === note.authorId;
  }
}
