import { USER_REPOSITORY } from '../constants';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories';
import { ListensTo } from '@squareboat/nest-events';
import { UserSignedUp } from '../events/userSignedUp';
import { NestNeo4jService } from '@libs/nest-neo4j';
import { uuid } from '@libs/core';

let prevNode;

const leafs = (prefix) => {
  return [
    {
      name: `${prefix}asset1`,
      uuid: `${prefix}asset1`,
    },
    {
      name: `${prefix}asset2`,
      uuid: `${prefix}asset2`,
    },
    {
      name: `${prefix}asset3`,
      uuid: `${prefix}asset3`,
    },

    {
      name: `${prefix}asset4`,
      uuid: `${prefix}asset4`,
    },
    {
      name: `${prefix}asset5`,
      uuid: `${prefix}asset5`,
    },
    {
      name: `${prefix}asset6`,
      uuid: `${prefix}asset6`,
    },
    {
      name: `${prefix}asset7`,
      uuid: `${prefix}asset7`,
    },
    {
      name: `${prefix}asset8`,
      uuid: `${prefix}asset8`,
    },
    {
      name: `${prefix}asset9`,
      uuid: `${prefix}asset9`,
    },
    {
      name: `${prefix}asset10`,
      uuid: `${prefix}asset10`,
    },
  ];
};

let spaces = 0;

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private users: UserRepositoryContract,
    private http: HttpService,
    private service: NestNeo4jService,
  ) {}

  async get({ query }): Promise<Record<string, any>> {
    const data = await this.service.run(query || 'MATCH (n) RETURN n', true);
    return data;
  }

  async create(inputs?: Record<string, any>) {
    console.log(
      '🚀 ~ file: user.ts ~ line 73 ~ UserService ~ create ~ inputs',
      inputs,
    );
    for (let i = 0; i < 2; i++) {
      const id = uuid();
      const data = await this.service.run(
        `CREATE (n:Space {uuid: "${id}", name: "Space ${spaces++}"}) `,
      );
      await this.service.run(
        `MATCH (n:Space {uuid: "${id}"}),(m:Space{uuid:"${prevNode}"}) CREATE (n)-[:SubSpace]->(m)`,
      );
      for (const leaf of leafs(`${spaces}_`)) {
        await this.service.run(
          `MATCH (n:Space {uuid: "${id}"}) CREATE (n)-[:HAS]->(:Asset {uuid: "${leaf.uuid}", name: "Asset ${leaf.name}"})`,
        );
      }
      prevNode = id;
    }
  }

  @ListensTo('USER_SIGNED_UP')
  userSignedUp(event: UserSignedUp): void {
    console.log('EVENT RECEIVED ===>', event);
    // add your logic here
    return;
  }
}
