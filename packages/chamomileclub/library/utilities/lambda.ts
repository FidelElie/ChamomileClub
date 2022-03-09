import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../configs/mongoose";

type apiMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
type MethodsApiMap = { [method in apiMethods]?: NextApiHandler }

type LambdaRouteInterface = (
	req: NextApiRequest,
	res: NextApiResponse,
	methods: MethodsApiMap
) => Promise<any>;

const executeLambdaRoute: LambdaRouteInterface = async (req, res, methods) => {
	const { url, method } = req;

	try {
		await dbConnect();

		if (!(method in methods)) { throw new Error(`${method} unsupported on route ${url}`); }

		const lambdaFunction: NextApiHandler | undefined = methods[method];

		if (!lambdaFunction) { throw new Error(`Function found for ${method} on ${url}`); }

		await lambdaFunction(req, res) as NextApiHandler;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export default executeLambdaRoute;
export type { LambdaRouteInterface, NextApiHandler, MethodsApiMap }
