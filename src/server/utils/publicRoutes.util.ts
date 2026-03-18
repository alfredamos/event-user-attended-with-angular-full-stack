const routes = [
  "/",
  "/login",
  "/signup",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/signup",
  "/api/auth/refresh",
  "/api/posts",
  "/api/authors",
  "/authors",
  "/posts"
]

export function isPublicRoute(route: string): boolean {
  return routes.includes(route);
}
