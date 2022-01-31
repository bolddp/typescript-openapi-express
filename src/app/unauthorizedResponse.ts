import { ApiError } from '../ApiError';
import { OpenApiEndpointResponse } from '../openapi/OpenApi';

export const unauthorizedResponse = (): OpenApiEndpointResponse<ApiError> => ({
  description: 'Forbidden',
  examples: {
    '40300': {
      description: 'Authentication token expected but not found',
      value: { errorCode: 40300, message: 'Missing token' },
    },
  },
});

export const notFoundResponse = (
  errorCode: number,
  message: string
): OpenApiEndpointResponse<ApiError> => ({
  description: 'Not found',
  examples: {
    [errorCode]: {
      description: message,
      value: {
        errorCode,
        message,
      },
    },
  },
});
