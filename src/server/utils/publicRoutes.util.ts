import {Request} from "express";
import {NextRequest} from "next/server";

const routes = [
    "/",
    "/api/login",
    "/api/logout",
    "/api/signup",
    "/api/refresh",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/signup",
    "/api/auth/refresh",
]

export function isPublicRoute(request: NextRequest){
    return routes.includes(request?.nextUrl?.pathname);
}