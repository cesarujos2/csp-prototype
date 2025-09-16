import { NextResponse } from "next/server";
import { PageRoutesConfigService } from "../_services/page-routes-config.service";
import { MiddlewareRedirectService } from "../_services/middleware-redirect.service";
import { MiddlewareLoggerService } from "../_services/middleware-logger.service";
import { Role } from "@prisma/client";
import {
  AuthenticatedRequest,
  AuthState,
  PageContext,
  MiddlewareContext,
  MiddlewareDecision,
  RedirectConfig,
  RedirectReason
} from "../_types/middleware.type";
import { PageRoute } from "../_types/route.type";

/**
 * Gets role-based redirect configuration
 */
export function getRoleBasedRedirect(role?: Role): RedirectConfig {
  const roleRouteMap: Record<Role, PageRoute> = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN', 
    MONITORING: 'MONITORING',
    OFFICER: 'OFFICER',
    USER: 'USER'
  };
  
  const targetRoute = role && roleRouteMap[role] ? roleRouteMap[role] : 'USER';
  
  return {
    to: targetRoute,
    reason: RedirectReason.ALREADY_AUTHENTICATED
  };
}

/**
 * Extracts authentication state from the request
 */
export function extractAuthState(req: AuthenticatedRequest): AuthState {
  const token = req.nextauth.token;
  return {
    isAuthenticated: !!token,
    profileComplete: token?.profileComplete ?? false,
    role: token?.role,
    token
  };
}

/**
 * Extracts page context information from the request
 */
export function extractPageContext(req: AuthenticatedRequest): PageContext {
  const pathname = req.nextUrl.pathname;
  
  return {
    pathname,
    isAuthPage: pathname.startsWith(PageRoutesConfigService.getPath("AUTH")),
    isDashboard: pathname.startsWith(PageRoutesConfigService.getPath("DASHBOARD")),
    isMainDashboard: pathname === PageRoutesConfigService.getPath("DASHBOARD"),
    isCompleteProfilePage: pathname.startsWith(PageRoutesConfigService.getPath("COMPLETE_PROFILE")),
    pageRouteData: PageRoutesConfigService.getRouteDataByPath(pathname),
    pageRoute: PageRoutesConfigService.getRouteByPath(pathname)
  };
}

/**
 * Creates a complete middleware context
 */
export function createMiddlewareContext(req: AuthenticatedRequest): MiddlewareContext {
  return {
    request: req,
    auth: extractAuthState(req),
    page: extractPageContext(req)
  };
}

/**
 * Creates a redirect response using the optimized redirect service
 */
export function createRedirect(req: AuthenticatedRequest, config: RedirectConfig): NextResponse {
  return MiddlewareRedirectService.createSafeRedirect(req, config);
}

/**
 * Determines the appropriate action for authenticated users on auth page
 */
export function handleAuthenticatedOnAuthPage(context: MiddlewareContext): MiddlewareDecision {
  const { auth } = context;
  const redirects = MiddlewareRedirectService.getCommonRedirects();
  
  if (!auth.profileComplete) {
    return {
      action: 'redirect',
      redirect: redirects.toCompleteProfile
    };
  }
  
  // Redirect to role-specific route based on user role
  return {
    action: 'redirect',
    redirect: getRoleBasedRedirect(auth.role)
  };
}

/**
 * Determines the appropriate action for unauthenticated users on dashboard
 */
export function handleUnauthenticatedOnDashboard(): MiddlewareDecision {
  const redirects = MiddlewareRedirectService.getCommonRedirects();
  
  return {
    action: 'redirect',
    redirect: redirects.toAuth
  };
}

/**
 * Determines the appropriate action for authenticated users with incomplete profile
 */
export function handleIncompleteProfile(context: MiddlewareContext): MiddlewareDecision {
  const { page } = context;
  
  // Allow access to complete profile page and public pages
  if (page.isCompleteProfilePage || page.pageRouteData?.isPublic) {
    return { action: 'allow' };
  }
  
  // Redirect to complete profile for protected pages
  const redirects = MiddlewareRedirectService.getCommonRedirects();
  return {
    action: 'redirect',
    redirect: redirects.toCompleteProfile
  };
}

/**
 * Determines the appropriate action for complete profile page access
 */
export function handleCompleteProfilePageAccess(context: MiddlewareContext): MiddlewareDecision {
  const { auth } = context;
  
  // Redirect unauthenticated users to auth
  if (!auth.isAuthenticated) {
    const redirects = MiddlewareRedirectService.getCommonRedirects();
    return {
      action: 'redirect',
      redirect: redirects.toAuth
    };
  }
  
  // Redirect users with complete profile to role-specific route
  if (auth.profileComplete) {
    return {
      action: 'redirect',
      redirect: getRoleBasedRedirect(auth.role)
    };
  }
  
  return { action: 'allow' };
}

/**
 * Handles access to the main dashboard page and redirects to role-specific dashboard
 */
export function handleMainDashboardAccess(context: MiddlewareContext): MiddlewareDecision {
  const { auth } = context;
  
  // Redirect authenticated users with complete profile to their role-specific dashboard
  if (auth.isAuthenticated && auth.profileComplete) {
    return {
      action: 'redirect',
      redirect: getRoleBasedRedirect(auth.role)
    };
  }
  
  // Allow access for other cases (will be handled by other middleware functions)
  return { action: 'allow' };
}

/**
 * Validates if user is accessing the correct role-specific dashboard
 */
export function handleRoleBasedDashboardAccess(context: MiddlewareContext): MiddlewareDecision {
  const { auth, page } = context;
  
  // Only validate for authenticated users with complete profile on dashboard pages
  if (!auth.isAuthenticated || !auth.profileComplete || !page.isDashboard || page.isMainDashboard) {
    return { action: 'allow' };
  }
  
  // Get the expected dashboard path for user's role
  const expectedRedirect = getRoleBasedRedirect(auth.role);
  const expectedPageRoute = expectedRedirect.to;

  // Check if user is on the wrong dashboard
  if (page.pageRoute !== expectedPageRoute) {
    return {
      action: 'redirect',
      redirect: expectedRedirect
    };
  }
  
  return { action: 'allow' };
}

/**
 * Main middleware decision logic with performance tracking
 */
export function makeMiddlewareDecision(context: MiddlewareContext): MiddlewareDecision {
  const startTime = Date.now();
  const { auth, page } = context;
  
  // Handle unknown routes
  if (!page.pageRouteData) {
    return { action: 'allow' };
  }
  
  // Handle authenticated user on auth page
  if (page.isAuthPage && auth.isAuthenticated) {
    return handleAuthenticatedOnAuthPage(context);
  }
  
  // Handle unauthenticated user trying to access dashboard
  if (page.isDashboard && !auth.isAuthenticated) {
    return handleUnauthenticatedOnDashboard();
  }
  
  // Handle main dashboard access - redirect to role-specific dashboard
  if (page.isMainDashboard && auth.isAuthenticated && auth.profileComplete) {
    return handleMainDashboardAccess(context);
  }
  
  // Handle role-based dashboard access validation
  if (page.isDashboard && !page.isMainDashboard && auth.isAuthenticated && auth.profileComplete) {
    return handleRoleBasedDashboardAccess(context);
  }
  
  // Handle complete profile page access
  if (page.isCompleteProfilePage) {
    return handleCompleteProfilePageAccess(context);
  }
  
  // Handle authenticated users with incomplete profile on protected pages
  if (auth.isAuthenticated && !auth.profileComplete) {
    return handleIncompleteProfile(context);
  }
  
  // Allow access by default
  const decision = { action: 'allow' } as MiddlewareDecision;
  
  // Log performance metrics
  const duration = Date.now() - startTime;
  if (duration > 100) { // Log slow middleware operations
    MiddlewareLoggerService.logPerformance('middleware_decision', duration, context);
  }
  
  return decision;
}

/**
 * Logs middleware decisions using the enhanced logging service
 */
export function logMiddlewareDecision(
  context: MiddlewareContext, 
  decision: MiddlewareDecision,
  duration?: number
): void {
  MiddlewareLoggerService.logDecision(context, decision, duration);
  
  // Log security events for suspicious patterns
  if (decision.action === 'redirect' && decision.redirect) {
    const { reason } = decision.redirect;
    
    // Log potential security concerns
    if (reason === RedirectReason.UNAUTHENTICATED && context.page.isDashboard) {
      MiddlewareLoggerService.logSecurityEvent(
        'Unauthenticated dashboard access attempt',
        context,
        'low'
      );
    }
    
    if (reason === RedirectReason.ACCESS_DENIED) {
      MiddlewareLoggerService.logSecurityEvent(
        'Access denied to protected resource',
        context,
        'medium'
      );
    }
  }
}