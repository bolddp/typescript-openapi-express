import express, { IRouter, Response } from 'express';
import { HasOpenApiNodes } from './OpenApiNode';
import { OpenApiSchemaDescription } from './OpenApiSchema';

export type ErrorHandler = (rsp: Response, error: any) => void;

export interface OpenApiAppConfig extends HasOpenApiNodes {
  /**
   * Description of the schemas that are part of the API. The descriptions are optional,
   * but they will provide for a richer Open API specification since their contents will be merged
   * with the schema data that can be deduced from other parts of the application.
   */
  schemaDescriptions: OpenApiSchemaDescription[];
  errorHandler?: ErrorHandler;
  log?: (message: string) => void;
}

export class OpenApiAppBuilder {
  private config: OpenApiAppConfig;

  constructor(config: OpenApiAppConfig) {
    this.config = config;
  }

  private useRoutes<T>(router: IRouter, parent: HasOpenApiNodes) {
    for (const node of parent.nodes) {
      node.attach(undefined, router, this.config, []);
    }
  }

  build(): express.Application {
    const app = express();
    this.useRoutes(app, this.config);
    return app;
  }
}
