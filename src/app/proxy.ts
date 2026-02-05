import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
    // Get Token from Cookies
    const token = request.cookies.get("token")?.value || "";

    // Get the requested path name
    const pathName = request.nextUrl.pathname;

    // Public Routes
    const publicRoutes = [
        "/sign-in",
        "/sign-up",
        "/prices",
        "/about",
        "/contact",
        "/policy",
        "/privacy"
    ];
    
    // Allow public routes
    if (publicRoutes.includes(pathName)) {
        return NextResponse.next();
    }

    // Redirect to sign-in if no token found
    if (!token) {
        const url = request.nextUrl.clone();
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
    }

    // Create new headers object
    const headers = new Headers(request.headers);
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    // Create a new request with the updated headers
    const modifiedRequest = new Request(request.url, {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: 'follow',
    });

    return NextResponse.next({ request: modifiedRequest });
}

export const config = {
    matcher: [
      /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};