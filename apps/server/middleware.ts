import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl;

	if (!pathname.startsWith("/api")) {
		return NextResponse.redirect(new URL(`/api${pathname}${search}`, request.url));
	}

	return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/image|public).*)'] }
