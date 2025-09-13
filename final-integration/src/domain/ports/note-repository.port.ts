// T028: NoteRepositoryPort defines required persistence operations.
import { Note, CreateNoteInput, UpdateNoteInput } from "../entities/note";

export interface NoteRepositoryPort {
  create(input: CreateNoteInput): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  listAll(): Promise<Note[]>;
  listByAuthor(authorId: string): Promise<Note[]>;
  update(id: string, input: UpdateNoteInput): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
}

export const NOTE_REPOSITORY = Symbol("NOTE_REPOSITORY");
