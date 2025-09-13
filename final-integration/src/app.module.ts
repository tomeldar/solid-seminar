// T042: Root AppModule wiring skeleton providers with placeholders
import { Module } from "@nestjs/common";
import { UsersController } from "./interface/controllers/users.controller";
import { NotesController } from "./interface/controllers/notes.controller";
import { PgUserRepositoryProvider } from "./infrastructure/persistence/pg-user.repository";
import { PgNoteRepositoryProvider } from "./infrastructure/persistence/pg-note.repository";
import { AuthorizationService } from "./application/services/authorization.service";
import { CreateNoteService } from "./application/services/create-note.service";
import { UpdateNoteService } from "./application/services/update-note.service";
import { ListNotesService } from "./application/services/list-notes.service";
import { DeleteNoteService } from "./application/services/delete-note.service";
import { AUTHORIZATION_PORT } from "./domain/ports/authorization.port";

@Module({
  imports: [],
  controllers: [UsersController, NotesController],
  providers: [
    PgUserRepositoryProvider,
    PgNoteRepositoryProvider,
    { provide: AUTHORIZATION_PORT, useClass: AuthorizationService },
    CreateNoteService,
    UpdateNoteService,
    ListNotesService,
    DeleteNoteService,
  ],
})
export class AppModule {}
