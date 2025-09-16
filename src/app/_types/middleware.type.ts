import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";
import { PageRoute, PageRouteData } from "./route.type";
import { Role } from "@prisma/client";

/**
 * Extended NextAuth JWT token with custom properties
 */
export interface ExtendedJWT extends JWT {
  profileComplete?: boolean;
}

/**
 * Extended NextRequest with NextAuth token
 */
export interface AuthenticatedRequest extends NextRequest {
  nextauth: {
    token: ExtendedJWT | null;
  };
}

/**
 * User authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  profileComplete: boolean;
  role?: Role;
  token: ExtendedJWT | null;
}

/**
 * Page context information
 */
export interface PageContext {
  pathname: string;
  isAuthPage: boolean;
  isDashboard: boolean;
  isMainDashboard: boolean;
  isCompleteProfilePage: boolean;
  pageRoute: PageRoute | null;
  pageRouteData: PageRouteData | null;
}

/**
 * Middleware redirect configuration
 */
export interface RedirectConfig {
  to: PageRoute;
  reason: RedirectReason;
}

/**
 * Reasons for middleware redirects
 */
export enum RedirectReason {
  UNAUTHENTICATED = 'unauthenticated',
  PROFILE_INCOMPLETE = 'profile_incomplete',
  PROFILE_COMPLETE = 'profile_complete',
  ALREADY_AUTHENTICATED = 'already_authenticated',
  ACCESS_DENIED = 'access_denied'
}

/**
 * Middleware decision result
 */
export interface MiddlewareDecision {
  action: 'redirect' | 'allow';
  redirect?: RedirectConfig;
}

/**
 * Middleware context containing all necessary information
 */
export interface MiddlewareContext {
  request: AuthenticatedRequest;
  auth: AuthState;
  page: PageContext;
}