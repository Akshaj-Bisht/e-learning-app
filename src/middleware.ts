import { clerkMiddleware } from "@clerk/nextjs/server";

// Protect all routes except public ones
export default clerkMiddleware();

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


