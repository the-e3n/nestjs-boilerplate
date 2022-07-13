import { Module } from '@nestjs/common';
import { NestNeo4jService } from './nest-neo4j.service';

@Module({
  providers: [NestNeo4jService],
  exports: [NestNeo4jService],
})
export class NestNeo4jModule {}
