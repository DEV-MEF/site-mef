import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/ministerio") {
    return NextResponse.redirect(new URL("/ministerio/sobre-nos", request.url));
  }

  if (request.nextUrl.pathname === "/publicacoes") {
    return NextResponse.redirect(new URL("/publicacoes/noticias", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ministerio/:path*", "/publicacoes/:path*"],
};
