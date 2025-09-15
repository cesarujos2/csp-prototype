import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { PageRoutesConfigService } from "./app/_services/page-routes-config.service";
import { MiddlewareLoggerService } from "./app/_services/middleware-logger.service";
import {
  createMiddlewareContext,
  makeMiddlewareDecision,
  createRedirect,
  logMiddlewareDecision
} from "./app/_utils/middleware.utils";
import { AuthenticatedRequest } from "./app/_types/middleware.type";

/**
 * Enhanced middleware with improved structure and separation of concerns
 * Follows Clean Architecture principles and SOLID design patterns
 */
export default withAuth(
  function middleware(req: AuthenticatedRequest) {
    const startTime = Date.now();
    let context: ReturnType<typeof createMiddlewareContext> | undefined;
    
    try {
      // Create middleware context with all necessary information
      context = createMiddlewareContext(req);
      
      // Make decision based on context
      const decision = makeMiddlewareDecision(context);
      
      // Calculate execution time
      const duration = Date.now() - startTime;
      
      // Log decision with performance metrics
      logMiddlewareDecision(context, decision, duration);
      
      // Execute decision
      if (decision.action === 'redirect' && decision.redirect) {
        return createRedirect(req, decision.redirect);
      }
      
      // Allow access by default
      return NextResponse.next();
    } catch (error) {
      // Enhanced error handling with structured logging
      const errorInstance = error instanceof Error ? error : new Error(String(error));
      
      MiddlewareLoggerService.logError(errorInstance, context, {
        pathname: req.nextUrl.pathname,
        userAgent: req.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      });
      
      // Allow access to prevent breaking the application
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth page without token
        if (req.nextUrl.pathname.startsWith(PageRoutesConfigService.getPath("AUTH"))) {
          return true;
        }
        // For dashboard and other protected routes, require token
        if (req.nextUrl.pathname.startsWith(PageRoutesConfigService.getPath("DASHBOARD"))) {
          return !!token;
        }
        // Allow access to public pages
        return true;
      },
    },
  }
);