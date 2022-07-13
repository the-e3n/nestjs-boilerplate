import { Module } from '@nestjs/common';
import { EventModule } from '@squareboat/nest-events';
import { UserModule } from './user';
import { DbModule } from './_db';
import { CoreModule } from '@libs/core';
import { ConsoleModule } from '@squareboat/nest-console';
import { NestNeo4jModule } from '@libs/nest-neo4j';

@Module({
  imports: [
    DbModule,
    CoreModule,
    UserModule,
    EventModule,
    ConsoleModule,
    NestNeo4jModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
