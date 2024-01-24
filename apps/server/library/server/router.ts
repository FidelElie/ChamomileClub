import { NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { handlerConfiguration } from "./configuration";
import { CreatedController } from "./controllers";
import { ApiRequest, Middleware } from "./types";

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

export type RouterOptions<
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
> = {
  controllers: (CreatedController | CreatedController[])[];
  middlewares?: Middleware<NextRequest, NextResponse>[];
};
