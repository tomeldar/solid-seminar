// T025: User entity definition (domain model)
// Kept minimal; can be expanded with methods later if rich domain model needed.
import { UserRole } from "../security/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role?: UserRole; // optional on create (default STUDENT)
}
