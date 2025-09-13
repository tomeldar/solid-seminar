// T037: Skeleton list notes service
import {
  NOTE_REPOSITORY,
  NoteRepositoryPort,
} from "../../domain/ports/note-repository.port";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ListNotesService {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepositoryPort
  ) {}

  async execute(authorOnly?: string) {
    if (authorOnly) return this.notes.listByAuthor(authorOnly);
    return this.notes.listAll();
  }
}
