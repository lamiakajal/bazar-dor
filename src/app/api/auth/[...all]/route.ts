import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Mount BetterAuth request handlers for Next.js App Router API routes
export const { POST, GET } = toNextJsHandler(auth);
