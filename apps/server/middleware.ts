import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
  const router = createEdgeRouter<NextRequest, NextFetchEvent>();

  router.all((request) => {
    const { pathname, search } = request.nextUrl;

    if (!pathname.startsWith("/api")) {
      return NextResponse.rewrite(
        new URL(`/api${pathname}${search}`, request.url),
      );
    }

    return NextResponse.next();
  });

  return router.run(request, event);
};

export const config = { matcher: ["/((?!_next/image|public).*)"] };
