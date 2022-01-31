import { ApiError } from '../ApiError';
import { GET } from '../Endpoint';
import { Order } from './Order';

export const orderRoutes = () => [
  GET<Order, ApiError>({
    handler: async (req) => {
      return {};
    },
  }),
];
