import { ApiError } from '../ApiError';
import { GET } from '../Endpoint';
import { AliveResponse } from './AliveResponse';

export const aliveRoutes = () => [
  GET<AliveResponse, ApiError>({
    handler: async (req) => {
      return { buildNumber: req.params.id || '123' };
    },
    openApi: {
      tags: ['/alive'],
    },
  }),
];
