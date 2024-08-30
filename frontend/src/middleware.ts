import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_PRIVATE_KEY = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY || "");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);

    // Check if the request is for an admin route
    if (request.nextUrl.pathname.startsWith("/admin") && payload.role === "admin") {
      return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/account")) return NextResponse.next();

    // Return to homepage 
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Configure matching paths
export const config = {
  matcher: [
    // Routes that require a login token
    "/protected/:path*",
    "/account/:path*",
    // Routes that require both a login token and admin role
    "/admin/:path*",
  ],
};
