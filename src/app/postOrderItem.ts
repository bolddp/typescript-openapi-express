import { ApiError } from '../ApiError';
import { ReqBodyEndpoint } from '../Endpoint';
import { OrderItem, Order } from './Order';
import { orderIdParameter } from './parameters';
import { unauthorizedResponse } from './unauthorizedResponse';

export const postOrderItem: ReqBodyEndpoint<OrderItem, Order, ApiError> = {
  handler: async (req, body) => {
    return {};
  },
  openApi: {
    summary: 'Add order item',
    description: 'Add order item',
    tags: ['/orders/items'],
    parameters: [orderIdParameter],
    errorResponses: {
      403: unauthorizedResponse(),
      404: {
        examples: {
          40401: {
            description: 'Order not found',
            value: { errorCode: 40401, message: 'Order not found' },
          },
        },
      },
    },
  },
};
