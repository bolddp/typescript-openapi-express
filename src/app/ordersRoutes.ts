import { ApiError } from '../ApiError';
import { GET, POST } from '../Endpoint';
import { path } from '../openapi/OpenApiPath';
import { Order } from './Order';
import { orderRoutes } from './orderRoutes';

export const ordersRoutes = () => [
  path('/:id', orderRoutes()),

  GET<Order[], ApiError>({
    handler: async (req) => {
      return [];
    },
    openApi: {
      tags: ['/orders'],
    },
  }),

  POST<Order, Order, ApiError>({
    handler: async (req, body) => {
      return {};
    },
    openApi: {
      tags: ['/orders'],
      errorResponses: {
        400: {
          description: 'Invalid request',
          examples: {
            '40001': {
              description: 'The order cannot be saved with a customer id',
              value: { errorCode: 40001, message: 'Customer id is required' },
            },
          },
        },
      },
    },
  }),
];
