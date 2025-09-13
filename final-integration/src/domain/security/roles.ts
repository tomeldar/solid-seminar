// T027: Role enum and permission helpers skeleton
export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}

export const DEFAULT_ROLE = UserRole.STUDENT;

export interface AuthorizationContext {
  actorId: string;
  actorRole: UserRole;
}

export function canEditNote(
  ctx: AuthorizationContext,
  noteAuthorId: string
): boolean {
  if (ctx.actorRole === UserRole.ADMIN) return true;
  if (ctx.actorRole === UserRole.INSTRUCTOR) return true; // refine later if needed
  return ctx.actorId === noteAuthorId;
}

export function canDeleteNote(
  ctx: AuthorizationContext,
  noteAuthorId: string
): boolean {
  return canEditNote(ctx, noteAuthorId);
}

export function canViewNote(
  ctx: AuthorizationContext,
  noteAuthorId: string
): boolean {
  if (ctx.actorRole === UserRole.ADMIN) return true;
  return true; // baseline: all notes visible (will refine when adding visibility rules)
}
