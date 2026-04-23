import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface Token {
  _id: string;
  username: string;
  role: {
    id: string;
    name: string;
  };
  iat?: number;
  exp?: number;
  jti?: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const method = request.method as "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  console.info(
    `LOG [${new Date().toISOString()}] Request: ${method} ${pathname}`
  );

  const isUserPath = pathname === "/api/user";
  const isPublicUserRoute = isUserPath && method === "POST";
  const isPaymentDetailPost =
    pathname === "/api/payment-detail" && method === "POST";

  const publicPaths = [
    "/api/auth/signin",
    "/auth/signin",
    "/api/auth/callback/credentials",
    "/api/auth/session",
    "/api/auth/signout",
    "/api/user/",
    "/api/user-details/",
    "/api/donation/",
    "/api/registry-item/",
    "/api/product-types",
    "/api/product",
    "/api/product",
    "/api/services",
    "/api/reset-password",
    "/api/gift-well",
    "/api/verify-email",
    "/api/support-message",
    "/api/contact-us",
    "/api/create-checkout-session",
    "/api/donation-payments",
    "/api/payment-success",
    "/api/blog",
    "/api/blog-category",
    "/api/role",
    "/api/article",
    "/api/stripe/stripe-checkout-session",
    "/api/stripe/stripe-retrieve-session",
    "/api/stripe/webhook",
  ];

  const isPublicPath =
    publicPaths.some((path) => pathname.startsWith(path)) ||
    isPublicUserRoute ||
    isPaymentDetailPost;

  if (!isPublicPath && pathname.startsWith("/api")) {
    if (!pathname.startsWith("/api/auth")) {
      const isAuthenticated = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!isAuthenticated) {
        return NextResponse.rewrite(
          new URL("/api/auth/unauthorized", request.url)
        );
      }
    }
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isPublicPath && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*", // Match all API routes
    "/dashboard",
  ],
};
