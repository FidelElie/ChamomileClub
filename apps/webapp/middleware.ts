import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;

	if (pathname === "/") { return NextResponse.redirect(new URL('/login', request.url)); }

	if (pathname.startsWith("/api")) {
		const baseUrl = process.env.NODE_ENV === "development" ?  "http://localhost:3000" : "https://api.thechamomileclub.com";
		const url = new URL(`${pathname}${search}`, baseUrl);
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)',] }
