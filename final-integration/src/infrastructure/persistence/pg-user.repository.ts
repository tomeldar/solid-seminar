// T032: Skeleton PG user repository (methods NOT_IMPLEMENTED)
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from "../../domain/ports/user-repository.port";
import { CreateUserInput, User } from "../../domain/entities/user";
import { getPgPool } from "./pg.datasource";
import { DEFAULT_ROLE } from "../../domain/security/roles";
import { randomUUID } from "crypto";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

function mapRow(r: UserRow): User {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role as any,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

let ensured = false;
async function ensureTable() {
  if (ensured) return;
  const pool = getPgPool();
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    role text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  );`);
  ensured = true;
}

export class PgUserRepository implements UserRepositoryPort {
  async create(input: CreateUserInput): Promise<User> {
    await ensureTable();
    const pool = getPgPool();
    const id = randomUUID();
    const role = input.role || DEFAULT_ROLE;
    const { rows } = await pool.query<UserRow>(
      `INSERT INTO users (id, name, email, role) VALUES ($1,$2,$3,$4)
       RETURNING id, name, email, role, created_at, updated_at`,
      [id, input.name, input.email, role]
    );
    return mapRow(rows[0]);
  }
  async findById(id: string): Promise<User | null> {
    await ensureTable();
    const pool = getPgPool();
    const { rows } = await pool.query<UserRow>(
      `SELECT id, name, email, role, created_at, updated_at FROM users WHERE id=$1 LIMIT 1`,
      [id]
    );
    return rows[0] ? mapRow(rows[0]) : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    await ensureTable();
    const pool = getPgPool();
    const { rows } = await pool.query<UserRow>(
      `SELECT id, name, email, role, created_at, updated_at FROM users WHERE email=$1 LIMIT 1`,
      [email]
    );
    return rows[0] ? mapRow(rows[0]) : null;
  }
}

export const PgUserRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: PgUserRepository,
};
