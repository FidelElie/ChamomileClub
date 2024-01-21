import nodePath from "path";

import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { HttpException, NotFoundException } from "../exceptions";
import type { ApiRequest } from "../types";

export const Controller = <
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
>(
  path = "/",
  options?: ControllerOptions<NextRequest, NextResponse>,
) => {
  const mergeOptions = Object.assign({}, { middlewares: [] }, options ?? {});

  const { middlewares } = mergeOptions;

  // biome-ignore lint/suspicious/noExplicitAny: FIXME
  const router = createRouter<any, NextResponse>();

  for (const middleware of middlewares) {
    router.use(middleware);
  }

  return {
    path,
    router,
    user: router.use,
    get: router.get,
    post: router.post,
    patch: router.patch,
    put: router.put,
    delete: router.delete,
    head: router.head,
    bootstrap: () => router.handler(handlerConfiguration),
  };
};

export const ControllerGroup = ({ path, controllers }: ControllerGrouping) => {
  const joinPaths = (controllerPath: string) => {
    const normalisedPath = !path.startsWith("/") ? `/${path}` : path;

    return nodePath.posix.join(normalisedPath, controllerPath);
  };

  return controllers.map((controller) => ({
    ...controller,
    path: joinPaths(controller.path),
  }));
};

export const createServerRouter = <
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
>(
  options?: RouterOptions<NextRequest, NextResponse>,
) => {
  const mergeOptions = Object.assign(
    { controllers: [], middlewares: [] } as RouterOptions<NextRequest, NextResponse>,
    options ?? {},
  );

  const { controllers, middlewares } = mergeOptions;

  const flattenedControllers = controllers.flat();

  return async (req: NextRequest, res: NextResponse) => {
    // biome-ignore lint/suspicious/noExplicitAny: FIXME
    const routerTest = createRouter<any, NextResponse>();

    for (const middleware of (middlewares || [])) { middleware(req, res, () => {}); }

    for (const controller of flattenedControllers) {
      const { path, router } = controller;

      routerTest.use(path, router);
    }

    return routerTest.handler(handlerConfiguration)(req, res);
  };
};

const handlerConfiguration = {
  onNoMatch: (_: ApiRequest) => {
    throw new NotFoundException("Route not found");
  },
  onError: (error: unknown, _: ApiRequest, res: NextApiResponse) => {
    const isStandardError = error instanceof Error;
    const isHTTPException = error instanceof HttpException;

    res.status(isHTTPException ? error.status : 500).json({
      ...(isHTTPException
        ? {
          status: error.status,
          message: error.message,
          metadata: error.metadata,
        }
        : {}),
      ...((process.env.NODE_ENV === "development" && isStandardError)
        ? {
          stack: error.stack,
        }
        : {}),
    });
  },
};

export type CreatedController = ReturnType<typeof Controller>;

export type ControllerGrouping = {
  path: string;
  controllers: CreatedController[];
};

export type Middleware<
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
> = (req: NextRequest, res: NextResponse, next: () => void) => unknown;

export type ControllerOptions<
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
> = {
  middlewares?: Middleware<NextRequest, NextResponse>[];
};

export type RouterOptions<
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
> = {
  controllers: (CreatedController | CreatedController[])[];
  middlewares?: Middleware<NextRequest, NextResponse>[];
};

export * from "./parseContextHandler";
