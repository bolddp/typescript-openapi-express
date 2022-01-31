import { OpenApiParameter, OpenApiParameterSource } from '../openapi/OpenApi';

export const orderIdParameter: OpenApiParameter<string> = {
  source: OpenApiParameterSource.Path,
  name: 'orderId',
  required: true,
};
