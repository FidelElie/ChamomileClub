import type { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from "next-api-decorators";

import type { RouterOptions } from "./types";
import { CONTROLLER_TOKEN } from "./decorators";

const routerOptions: Required<RouterOptions> = {
	controllers: [],
	middlewares: [],
}

export const createServerRouter = (options: RouterOptions) => {
	const mergeOptions = Object.assign({}, routerOptions, options ?? {});

	const { controllers, middlewares } = mergeOptions;

	return () => {
		if (!controllers.length) {
			throw new Error("At least one controller is required to create server router");
		}

		const handlersMap = controllers.map(controller => {
			const handler = createHandler(controller);

			const controllerPath = Reflect.getMetadata(CONTROLLER_TOKEN, controller);

			const normalisedPath = !controllerPath.startsWith("/") ? `/${controllerPath}` : controllerPath;

			return { basePath: normalisedPath, handler }
		});

		return async (req: NextApiRequest, res: NextApiResponse) => {
			const { url } = req;

			middlewares.forEach(async middleware => { await middleware(req, res, () => {}); });

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
}
