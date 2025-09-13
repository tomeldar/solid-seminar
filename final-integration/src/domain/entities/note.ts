// T026: Note entity definition
export interface Note {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  // Potential future fields: visibility, tags, archived
}

export interface CreateNoteInput {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
}
