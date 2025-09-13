import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  Inject,
} from "@nestjs/common";
import { CreateNoteDto } from "../dto/create-note.dto";
import { CreateNoteService } from "../../application/services/create-note.service";
import { ListNotesService } from "../../application/services/list-notes.service";
import { GetNoteService } from "../../application/services/get-note.service";
import { UpdateNoteService } from "../../application/services/update-note.service";
import { DeleteNoteService } from "../../application/services/delete-note.service";
import {
  NOTE_REPOSITORY,
  NoteRepositoryPort,
} from "../../domain/ports/note-repository.port";
import { UserRole } from "../../domain/security/roles";

@Controller("notes")
export class NotesController {
  constructor(
    private readonly createNote: CreateNoteService,
    private readonly listNotes: ListNotesService,
    private readonly getNote: GetNoteService,
    private readonly updateNote: UpdateNoteService,
    private readonly deleteNote: DeleteNoteService,
    @Inject(NOTE_REPOSITORY) private readonly notesRepo: NoteRepositoryPort
  ) {}

  @Post()
  async create(@Body() dto: CreateNoteDto) {
    return this.createNote.execute(dto);
  }

  @Get()
  async list() {
    return this.listNotes.execute();
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.getNote.execute(id, {
      actorId: "anonymous",
      actorRole: UserRole.STUDENT,
    });
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: any) {
    const existing = await this.notesRepo.findById(id);
    if (!existing) throw new NotFoundException("NOTE_NOT_FOUND");
    return this.updateNote.execute(id, body, {
      actorId: existing.authorId,
      actorRole: UserRole.STUDENT,
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const existing = await this.notesRepo.findById(id);
    if (!existing) throw new NotFoundException("NOTE_NOT_FOUND");
    await this.deleteNote.execute(id, {
      actorId: existing.authorId,
      actorRole: UserRole.STUDENT,
    });
    return { status: 204 };
  }
}
