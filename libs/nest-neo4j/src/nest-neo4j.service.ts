import { Injectable } from '@nestjs/common';
import { driver, isInt, Neo4jError, Record } from 'neo4j-driver';
import { inSafeRange } from 'neo4j-driver-core';
import { getReadSession, getSession } from './connection';

@Injectable()
export class NestNeo4jService {
  private session: any;
  constructor() {}
  async getAllNodes() {
    this.session = await getSession();
    const result = await this.session.run('MATCH (n) RETURN n');
    return result.records.map((record: Record) => {
      const properties = record.get('n').properties;
      //   for (const key in properties) {
      //     if (isInt(properties[key])) {
      //       const val = properties[key];
      //       properties[key] = inSafeRange(val) ? val.toNumber() : val.toString();
      //     }
      //   }
      const d = (property) =>
        isInt(property.value)
          ? property.value.toNumber()
          : property.value.toString();

      return {
        ...record.get('n').properties,
        labels: record.get('n').labels,
      };
    });
  }
  async run(query: string, read: boolean): Promise<any> {
    console.log(
      '🚀 ~ file: nest-neo4j.service.ts ~ line 34 ~ NestNeo4jService ~ run ~ read',
      read,
    );
    if (read) {
      const result = await getReadSession().run(query);
      return result;
    }
    const result = await getSession().run(query);
    return result;
  }
}
