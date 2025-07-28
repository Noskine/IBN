import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const PUBLIC_ROUTES = ["/", "/api/auth/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
