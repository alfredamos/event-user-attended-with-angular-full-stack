import {NextRequest} from "next/server";

export function authenticationMiddleware(request: NextRequest) {
    //----> Public routes are alowed to access without authentication.
    const isPublicRoute = request.nextUrl.pathname.startsWith('/api/auth');
}