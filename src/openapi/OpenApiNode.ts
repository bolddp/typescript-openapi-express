import { IRouter } from 'express';
import { OpenApiAppConfig } from './OpenApiAppBuilder';

export interface HasOpenApiNodes {
  nodes: OpenApiNode[];
}

export interface OpenApiNode {
  attach(
    parentRouter: IRouter | undefined,
    router: IRouter,
    appConfig: OpenApiAppConfig,
    pathSegments: string[]
  ): void;
}
