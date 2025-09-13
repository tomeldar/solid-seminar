// T030: AuthorizationPort - abstraction for checking permissions.
import { AuthorizationContext } from "../security/roles";
import { Note } from "../entities/note";

export interface AuthorizationPort {
  canView(ctx: AuthorizationContext, note: Note): boolean;
  canEdit(ctx: AuthorizationContext, note: Note): boolean;
  canDelete(ctx: AuthorizationContext, note: Note): boolean;
}

export const AUTHORIZATION_PORT = Symbol("AUTHORIZATION_PORT");
