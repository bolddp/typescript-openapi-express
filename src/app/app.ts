import { path } from '../openapi/OpenApiPath';
import { aliveRoutes as aliveRoutes } from './aliveRoutes';
import { OpenApiAppBuilder as OpenApiAppBuilder } from '../openapi/OpenApiAppBuilder';
import { AliveResponse } from './AliveResponse';
import { schema } from '../openapi/OpenApiSchema';
import { ordersRoutes } from './ordersRoutes';

export const appBuilder = new OpenApiAppBuilder({
  nodes: [path('/alive', aliveRoutes()), path('/orders', ordersRoutes())],
  schemaDescriptions: [
    schema<AliveResponse>({
      description: '',
      example: {
        buildNumber: 'BUILD-01',
      },
      properties: {
        buildNumber: { description: 'The current build number of the API' },
      },
    }),
  ],
  log: (msg) => console.log(`[app] ${msg}`),
});
