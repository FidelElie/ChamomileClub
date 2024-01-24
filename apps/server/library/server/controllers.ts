import { default as nodePath } from "path";

import { NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { handlerConfiguration } from "./configuration";
import type { ApiRequest, ControllerOptions } from "./types";

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

export type CreatedController = ReturnType<typeof Controller>;

export type ControllerGrouping = {
  path: string;
  controllers: CreatedController[];
};
