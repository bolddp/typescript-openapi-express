export interface OpenApiExample<TResponse> {
  description?: string;
  value: TResponse;
}

export interface OpenApiEndpointResponse<TResponse> {
  description?: string;
  examples?: { [key: string]: OpenApiExample<TResponse> };
}

export interface OpenApiEndpoint<TErrorResponse> {
  summary?: string;
  description?: string;
  // operationId: string; // Should be able to auto generate this
  tags: string[];
  parameters?: OpenApiParameter<any>[];
  errorResponses?: { [key: number]: OpenApiEndpointResponse<TErrorResponse> };
}

export enum OpenApiParameterSource {
  Path,
  Query,
  Header,
  Cookie,
}

export interface OpenApiParameter<T> {
  source: OpenApiParameterSource;
  name: string;
  description?: string;
  required: boolean;
  example?: T;
}
