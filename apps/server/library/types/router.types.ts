import type { NextApiRequest, NextApiResponse } from "next"
import type { NextFunction } from "next-api-decorators";

export type Middleware<
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
> = (
	req: NextRequest,
	res: NextResponse,
	next: NextFunction
) => any;


export type RouterOptions<
	NextRequest extends NextApiRequest = NextApiRequest,
	NextResponse extends NextApiResponse = NextApiResponse
> = {
	controllers: any[]
	middlewares?: Middleware<NextRequest, NextResponse>[]
}
