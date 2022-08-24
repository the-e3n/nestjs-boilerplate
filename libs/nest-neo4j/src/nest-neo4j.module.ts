import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { EventModule } from '@squareboat/nest-events';
import { NEO4J_OPTIONS } from './constants';
import {
  Neo4jAsyncOptions,
  Neo4jAsyncOptionsFactory,
  Neo4jOptions,
} from './interfaces/options';

@Module({})
export class Neo4jModule {
  /**
   * Register options
   * @param options
   */
  static register(options: Neo4jOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: Neo4jModule,
      imports: [DiscoveryModule, EventModule],
      providers: [{ provide: NEO4J_OPTIONS, useValue: options }],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(options: Neo4jAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: Neo4jModule,
      imports: [DiscoveryModule, EventModule],
      providers: [this.createNeo4jOptionsProvider(options)],
    };
  }

  private static createNeo4jOptionsProvider(
    options: Neo4jAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEO4J_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<Neo4jOptions>,
    ];

    return {
      provide: NEO4J_OPTIONS,
      useFactory: async (optionsFactory: Neo4jAsyncOptionsFactory) =>
        await optionsFactory.createNeo4jOptions(),
      inject,
    };
  }
}
