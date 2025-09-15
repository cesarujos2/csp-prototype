import { NextResponse } from "next/server";
import { PageRoutesConfigService } from "./page-routes-config.service";
import { AuthenticatedRequest, RedirectConfig, RedirectReason } from "../_types/middleware.type";
import { PageRoute } from "../_types/route.type";

/**
 * Service for handling middleware redirects with optimized logic
 * Follows Single Responsibility Principle (SRP)
 */
export class MiddlewareRedirectService {
  
  /**
   * Creates a redirect response with enhanced features
   */
  static createRedirect(
    req: AuthenticatedRequest, 
    config: RedirectConfig,
    preserveQuery: boolean = false
  ): NextResponse {
    const targetPath = PageRoutesConfigService.getPath(config.to);
    const redirectUrl = new URL(targetPath, req.url);
    
    // Preserve original query parameters if requested
    if (preserveQuery) {
      req.nextUrl.searchParams.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value);
      });
    }
    
    // Add redirect metadata for debugging and analytics
    this.addRedirectMetadata(redirectUrl, config, req);
    
    return NextResponse.redirect(redirectUrl);
  }
  
  /**
   * Creates a redirect configuration for common scenarios
   */
  static createRedirectConfig(to: PageRoute, reason: RedirectReason): RedirectConfig {
    return { to, reason };
  }
  
  /**
   * Batch redirect configurations for common authentication flows
   */
  static getCommonRedirects() {
    return {
      toAuth: this.createRedirectConfig('AUTH', RedirectReason.UNAUTHENTICATED),
      toDashboard: this.createRedirectConfig('DASHBOARD', RedirectReason.ALREADY_AUTHENTICATED),
      toCompleteProfile: this.createRedirectConfig('COMPLETE_PROFILE', RedirectReason.PROFILE_INCOMPLETE),
      profileCompleted: this.createRedirectConfig('DASHBOARD', RedirectReason.PROFILE_COMPLETE)
    };
  }
  
  /**
   * Determines if a redirect should preserve query parameters
   */
  static shouldPreserveQuery(reason: RedirectReason): boolean {
    const preserveQueryReasons = [
      RedirectReason.UNAUTHENTICATED,
      RedirectReason.ACCESS_DENIED
    ];
    
    return preserveQueryReasons.includes(reason);
  }
  
  /**
   * Adds metadata to redirect URL for debugging and analytics
   */
  private static addRedirectMetadata(
    url: URL, 
    config: RedirectConfig, 
    req: AuthenticatedRequest
  ): void {
    // Add redirect reason for debugging in development
    if (process.env.NODE_ENV === 'development') {
      url.searchParams.set('redirect_reason', config.reason);
      url.searchParams.set('from_path', req.nextUrl.pathname);
    }
    
    // Add timestamp for cache busting if needed
    if (this.shouldAddTimestamp(config.reason)) {
      url.searchParams.set('t', Date.now().toString());
    }
  }
  
  /**
   * Determines if timestamp should be added to prevent caching issues
   */
  private static shouldAddTimestamp(reason: RedirectReason): boolean {
    const timestampReasons = [
      RedirectReason.PROFILE_COMPLETE,
      RedirectReason.PROFILE_INCOMPLETE
    ];
    
    return timestampReasons.includes(reason);
  }
  
  /**
   * Validates redirect configuration
   */
  static validateRedirectConfig(config: RedirectConfig): boolean {
    try {
      // Check if target route exists
      const targetPath = PageRoutesConfigService.getPath(config.to);
      return !!targetPath;
    } catch {
      return false;
    }
  }
  
  /**
   * Creates a safe redirect that falls back to home if target is invalid
   */
  static createSafeRedirect(
    req: AuthenticatedRequest, 
    config: RedirectConfig
  ): NextResponse {
    if (this.validateRedirectConfig(config)) {
      return this.createRedirect(req, config, this.shouldPreserveQuery(config.reason));
    }
    
    // Fallback to home page if redirect config is invalid
    console.warn(`[MiddlewareRedirectService] Invalid redirect config:`, config);
    const fallbackConfig = this.createRedirectConfig('HOME', RedirectReason.ACCESS_DENIED);
    return this.createRedirect(req, fallbackConfig);
  }
}