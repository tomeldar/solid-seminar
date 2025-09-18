import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../application/services/user.service';
import { USER_REPOSITORY } from '../../../domain/ports/user.repository';
import { PgUserRepository } from '../../outbound/repositories/user.repository.pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'KYSELY',
      useFactory: (): Kysely<any> => {
        const pool = new Pool({
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 5432,
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || 'postgres',
        });
        return new Kysely({ dialect: new PostgresDialect({ pool }) });
      },
    },
    {
      provide: USER_REPOSITORY,
      useFactory: (db: Kysely<any>) => new PgUserRepository(db),
      inject: ['KYSELY'],
    },
  ],
})
export class UserModule {}
