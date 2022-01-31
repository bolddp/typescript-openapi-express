import { Request, Response } from 'express';
import { OpenApiEndpoint } from './openapi/OpenApi';
import { ErrorHandler } from './openapi/OpenApiAppBuilder';
import { OpenApiNode } from './openapi/OpenApiNode';

export type ReqHandler<TResponse> = (req: Request) => Promise<TResponse>;
export type ReqBodyHandler<TBody, TResponse> = (
  req: Request,
  body: TBody
) => Promise<TResponse>;

export interface ReqEndpoint<TResponse, TErrorResponse> {
  handler: ReqHandler<TResponse>;
  openApi?: OpenApiEndpoint<TErrorResponse>;
}

export interface ReqBodyEndpoint<TBody, TResponse, TErrorResponse> {
  handler: ReqBodyHandler<TBody, TResponse>;
  openApi?: OpenApiEndpoint<TErrorResponse>;
}

const endpointHandlerBuilder = <TResponse>(
  fnc: (req: Request) => Promise<TResponse>,
  errorHandler?: ErrorHandler
) => {
  return async (req: Request, rsp: Response) => {
    try {
      const result = await fnc(req);
      rsp.status(200).send(result);
    } catch (error) {
      if (errorHandler) {
        errorHandler(rsp, error);
      } else {
        defaultErrorHandler(rsp, error);
      }
    }
  };
};

export const GET = <TResponse, TErrorResponse>(
  config: ReqEndpoint<TResponse, TErrorResponse>
): OpenApiNode => {
  return {
    attach: (parentRouter, router, appConfig, pathSegments) => {
      appConfig.log?.(`GET    ${pathSegments.join('')}`);
      (parentRouter || router).get(
        pathSegments[pathSegments.length - 1] ?? '',
        endpointHandlerBuilder(
          (req) => config.handler(req),
          appConfig.errorHandler
        )
      );
    },
  };
};

export const POST = <TBody, TResponse, TErrorResponse>(
  config: ReqBodyEndpoint<TBody, TResponse, TErrorResponse>
): OpenApiNode => {
  return {
    attach: (parentRouter, router, appConfig, pathSegments) => {
      appConfig.log?.(`POST   ${pathSegments.join('')}`);
      (parentRouter || router).post(
        pathSegments[pathSegments.length - 1] ?? '',
        endpointHandlerBuilder(
          (req) => config.handler(req, req.body),
          appConfig.errorHandler
        )
      );
    },
  };
};

export const PUT = <TBody, TResponse, TErrorResponse>(
  config: ReqBodyEndpoint<TBody, TResponse, TErrorResponse>
): OpenApiNode => {
  return {
    attach: (parentRouter, router, appConfig, pathSegments) => {
      appConfig.log?.(`PUT    ${pathSegments.join('')}`);
      (parentRouter || router).put(
        pathSegments[pathSegments.length - 1] ?? '',
        endpointHandlerBuilder(
          (req) => config.handler(req, req.body),
          appConfig.errorHandler
        )
      );
    },
  };
};

export const PATCH = <TBody, TResponse, TErrorResponse>(
  config: ReqBodyEndpoint<TBody, TResponse, TErrorResponse>
): OpenApiNode => {
  return {
    attach: (parentRouter, router, appConfig, pathSegments) => {
      appConfig.log?.(`PATCH  ${pathSegments.join('')}`);
      (parentRouter || router).patch(
        pathSegments[pathSegments.length - 1] ?? '',
        endpointHandlerBuilder(
          (req) => config.handler(req, req.body),
          appConfig.errorHandler
        )
      );
    },
  };
};

export const DELETE = <TResponse, TErrorResponse>(
  config: ReqEndpoint<TResponse, TErrorResponse>
): OpenApiNode => {
  return {
    attach: (parentRouter, router, appConfig, pathSegments) => {
      appConfig.log?.(`DELETE ${pathSegments.join('')}`);
      (parentRouter || router).delete(
        pathSegments[pathSegments.length - 1] ?? '',
        endpointHandlerBuilder(
          (req) => config.handler(req),
          appConfig.errorHandler
        )
      );
    },
  };
};

const defaultErrorHandler = (
  rsp: Response,
  error: any,
  includeStackTrace?: boolean
) => {
  let statusCode: number = 500;
  let errorCode: number = 500;
  let message: string = error.message || 'Internal error';
  let stacktrace: string | undefined = undefined;
  if (error.stack && includeStackTrace) {
    stacktrace = error.stack;
  }

  if (error.statusCode) {
    statusCode = error.statusCode < 1000 ? error.statusCode : 400;
    errorCode = error.statusCode;
  }
  const outboundError = {
    errorCode,
    message,
    metaData: error.metaData,
    stacktrace,
  };
  rsp.status(statusCode).json(outboundError);
};
