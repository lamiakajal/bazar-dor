"use client";

import { createAuthClient } from "better-auth/react";

// Initialize client-side authentication utilities and React hooks
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Export reusable auth methods and session listeners
export const { signIn, signUp, signOut, useSession } = authClient;
