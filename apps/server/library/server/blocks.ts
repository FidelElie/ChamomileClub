import nodePath from "path";

import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { NotFoundException } from "./exceptions";

const controllerOptions: Required<ControllerOptions> = {
	middlewares: []
}

export const Controller = <
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
>(path: string = "/", options?: ControllerOptions<NextRequest, NextResponse>) => {
	const mergeOptions = Object.assign({}, controllerOptions, options ?? {});

	const { middlewares } = mergeOptions;

	const router = createRouter<NextRequest, NextResponse>();

	for (const middleware of middlewares) { router.use(middleware); }

	return {
		path,
		router,
		bootstrap: () => {
			router.all("*", () => { throw new NotFoundException("Not Found") });

			return router.handler({
				onNoMatch: (_, res) => {
					res.status(404).end("Not Found");
				},
				onError: (error: any, _, res) => {
					res.status(error.statusCode || 500).end(error.message);
				}
			});
		}
	}
}

export const ControllerGroup = ({ path, controllers }: ControllerGrouping) => {
	const joinPaths = (controllerPath: string) => {
		const normalisedPath = !path.startsWith("/") ? `/${path}` : path;

		return nodePath.posix.join(normalisedPath, controllerPath);
	}

	return controllers.map(controller => ({ ...controller, path: joinPaths(controller.path) }));
}


const routerOptions: Required<RouterOptions> = {
	controllers: [],
	middlewares: [],
}

export const createServerRouter = <
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
>(options: RouterOptions<NextRequest, NextResponse>) => {
	const mergeOptions = Object.assign({}, routerOptions, options ?? {});

	const { controllers, middlewares } = mergeOptions;

	const flattenedControllers = controllers.flat();

	const handlersMap = flattenedControllers.map(controller => {
		const { path, bootstrap } = controller;

		const handler = bootstrap();

		const normalisedPath = !path.startsWith("/") ? `/${path}` : path;

		return { basePath: normalisedPath, handler }
	});

	return async (req: NextRequest, res: NextResponse) => {
		const { url } = req;

		for (const middleware of middlewares) { await middleware(req, res, () => {}); }

		if (!url) { return res.status(404).json({ statusCode: 404, url, message: "Not Found" }); }

		const strippedUrl = url.replace("/api", "");

		const normalisedUrl = strippedUrl === "" ? "/" : strippedUrl;

		const splitUrl = normalisedUrl.split("/");

		let matchedController = null;
		let index = 0;

		while (index < splitUrl.length) {
			const pathSegment = splitUrl.slice(0, splitUrl.length - index).join("/");
			matchedController = handlersMap.find(map => map.basePath === pathSegment)

			if (matchedController) { break; }

			index++;
		}

		if (!matchedController) {
			return res.status(404).json({ statusCode: 404, url, message: "Not Found" });
		}

		return matchedController.handler(req, res);
	}
}

export type CreatedController = ReturnType<typeof Controller>;

export type ControllerGrouping = { path: string; controllers: CreatedController[] };

export type Middleware<
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
> = (
	req: NextRequest,
	res: NextResponse,
	next: () => void
) => any;

export type ControllerOptions<
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
> = {
		middlewares?: Middleware<NextRequest, NextResponse>[]
}

export type RouterOptions<
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
> = {
	controllers: (CreatedController | CreatedController[])[]
	middlewares?: Middleware<NextRequest, NextResponse>[]
}
