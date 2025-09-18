import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../application/services/user.service';
import { USER_REPOSITORY } from '../../../domain/ports/user.repository';
import { PgUserRepository } from '../../outbound/repositories/user.repository.pg';
import { Kysely } from 'kysely';
import { DB, getKysely } from '../../../infrastructure/database/kysely';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'KYSELY', useFactory: (): Kysely<DB> => getKysely() },
    {
      provide: USER_REPOSITORY,
      useFactory: (db: Kysely<DB>) => new PgUserRepository(db),
      inject: ['KYSELY'],
    },
  ],
})
export class UserModule {}
