import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { USER_REPOSITORY } from './constants';
import { UserRepository } from './repositories';
import { GreetUser } from './commands';
import { NestNeo4jModule } from '@libs/nest-neo4j';

@Module({
  imports: [HttpModule, NestNeo4jModule],
  controllers: [UserController],
  providers: [
    UserService,
    GreetUser,
    { provide: USER_REPOSITORY, useClass: UserRepository },
  ],
})
export class UserModule {}
