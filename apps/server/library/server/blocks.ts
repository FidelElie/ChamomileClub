import nodePath from "path";

import { createRouter } from "next-connect";
import type { NextApiResponse } from "next";

import { ApiRequest } from "./types";
import { httpResponse, notFoundResponse } from "./responses";

export const Controller = <
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
>(
  path: string = "/",
  options?: ControllerOptions<NextRequest, NextResponse>,
) => {
  const mergeOptions = Object.assign({}, { middlewares: [] }, options ?? {});

  const { middlewares } = mergeOptions;

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
  options: RouterOptions<NextRequest, NextResponse>,
) => {
  const mergeOptions = Object.assign(
    {},
    { controllers: [], middlewares: [] },
    options ?? {},
  );

  const { controllers, middlewares } = mergeOptions;

  const flattenedControllers = controllers.flat();

  return async (req: NextRequest, res: NextResponse) => {
    const routerTest = createRouter<any, NextResponse>();

    for (const middleware of middlewares) {
      routerTest.use(middleware);
    }

    for (const controller of flattenedControllers) {
      const { path, router } = controller;

      routerTest.use(path, router);
    }

    return routerTest.handler(handlerConfiguration)(req, res);
  };
};

const handlerConfiguration = {
  onNoMatch: (_: ApiRequest, res: NextApiResponse) => {
    return notFoundResponse(res, "Route Not Found");
  },
  onError: (error: any, _: ApiRequest, res: NextApiResponse) => {
    if (!error.status) {
      console.error(error);
    }

    return httpResponse(res, {
      status: error.status || 500,
      message: error.message,
      data: process.env.NODE_ENV !== "production" ? { stack: error.stack } : {},
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
> = (req: NextRequest, res: NextResponse, next: () => void) => any;

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
