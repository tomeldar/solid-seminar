// T033: Skeleton PG note repository
import {
  NOTE_REPOSITORY,
  NoteRepositoryPort,
} from "../../domain/ports/note-repository.port";
import {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from "../../domain/entities/note";
import { getPgPool } from "./pg.datasource";
import { randomUUID } from "crypto";

interface NoteRow {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

function mapRow(r: NoteRow): Note {
  return {
    id: r.id,
    title: r.title,
    content: r.content,
    authorId: r.author_id,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

let ensuredNotes = false;
async function ensureTable() {
  if (ensuredNotes) return;
  const pool = getPgPool();
  await pool.query(`CREATE TABLE IF NOT EXISTS notes (
    id uuid PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    author_id uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  );`);
  ensuredNotes = true;
}

export class PgNoteRepository implements NoteRepositoryPort {
  async create(input: CreateNoteInput): Promise<Note> {
    await ensureTable();
    const pool = getPgPool();
    const id = randomUUID();
    const { rows } = await pool.query<NoteRow>(
      `INSERT INTO notes (id, title, content, author_id) VALUES ($1,$2,$3,$4)
       RETURNING id, title, content, author_id, created_at, updated_at`,
      [id, input.title, input.content, input.authorId]
    );
    return mapRow(rows[0]);
  }
  async findById(id: string): Promise<Note | null> {
    await ensureTable();
    const pool = getPgPool();
    const { rows } = await pool.query<NoteRow>(
      `SELECT id, title, content, author_id, created_at, updated_at FROM notes WHERE id=$1 LIMIT 1`,
      [id]
    );
    return rows[0] ? mapRow(rows[0]) : null;
  }
  async listAll(): Promise<Note[]> {
    await ensureTable();
    const pool = getPgPool();
    const { rows } = await pool.query<NoteRow>(
      `SELECT id, title, content, author_id, created_at, updated_at FROM notes ORDER BY created_at ASC`
    );
    return rows.map(mapRow);
  }
  async listByAuthor(authorId: string): Promise<Note[]> {
    await ensureTable();
    const pool = getPgPool();
    const { rows } = await pool.query<NoteRow>(
      `SELECT id, title, content, author_id, created_at, updated_at FROM notes WHERE author_id=$1 ORDER BY created_at ASC`,
      [authorId]
    );
    return rows.map(mapRow);
  }
  async update(id: string, input: UpdateNoteInput): Promise<Note | null> {
    await ensureTable();
    const pool = getPgPool();
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (typeof input.title === "string") {
      fields.push(`title=$${idx++}`);
      values.push(input.title);
    }
    if (typeof input.content === "string") {
      fields.push(`content=$${idx++}`);
      values.push(input.content);
    }
    if (!fields.length) {
      const existing = await this.findById(id);
      return existing; // no changes
    }
    values.push(id);
    const setClause = fields.join(", ");
    const { rows } = await pool.query<NoteRow>(
      `UPDATE notes SET ${setClause}, updated_at=now() WHERE id=$${idx} RETURNING id, title, content, author_id, created_at, updated_at`,
      values
    );
    return rows[0] ? mapRow(rows[0]) : null;
  }
  async delete(id: string): Promise<boolean> {
    await ensureTable();
    const pool = getPgPool();
    const { rowCount } = await pool.query(`DELETE FROM notes WHERE id=$1`, [
      id,
    ]);
    return rowCount > 0;
  }
}

export const PgNoteRepositoryProvider = {
  provide: NOTE_REPOSITORY,
  useClass: PgNoteRepository,
};
