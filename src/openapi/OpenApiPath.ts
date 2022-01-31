import { Router } from 'express';
import { HasOpenApiNodes, OpenApiNode } from './OpenApiNode';

export const path = (path: string, routes: OpenApiNode[]): OpenApiNode => {
  return {
    attach: (parentRouter, router, appConfig, pathSegments) => {
      const subRouter = Router({ mergeParams: true });
      for (const route of routes) {
        route.attach(router, subRouter, appConfig, pathSegments.concat([path]));
      }
      if (subRouter.stack.length > 0) {
        router.use(path, subRouter);
      }
    },
  };
};
