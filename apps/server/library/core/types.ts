import type { NextApiRequest, NextApiResponse } from "next"
import type { NextFunction } from "next-api-decorators";

export type Middleware = (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => any

export type RouterOptions = {
	controllers: any[]
	middlewares?: Middleware[]
}
