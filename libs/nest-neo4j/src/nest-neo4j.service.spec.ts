import { Test, TestingModule } from '@nestjs/testing';
import { NestNeo4jService } from './nest-neo4j.service';

describe('NestNeo4jService', () => {
  let service: NestNeo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestNeo4jService],
    }).compile();

    service = module.get<NestNeo4jService>(NestNeo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
