import { ModuleMetadata, Type } from '@nestjs/common';
import { Driver as Neo4jDriver } from 'neo4j-driver';

export interface Neo4jDriverOptions {
  [key: string]: string | number | Record<string, any>;
}

export interface Neo4jOptions {
  isGlobal?: boolean;
  default: string;
  connection: Neo4jDriverOptions;
}

export interface Neo4jAsyncOptionsFactory {
  createNeo4jOptions(): Promise<Neo4jOptions> | Neo4jOptions;
}

export interface Neo4jAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  isGlobal: boolean;
  useExisting?: Type<Neo4jOptions>;
  useClass?: Type<Neo4jAsyncOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<Neo4jOptions> | Neo4jOptions;
  inject?: any[];
}
