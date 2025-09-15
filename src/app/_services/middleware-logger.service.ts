import { MiddlewareContext, MiddlewareDecision } from "../_types/middleware.type";

/**
 * Logging levels for middleware operations
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Structured log entry for middleware operations
 */
export interface MiddlewareLogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: {
    pathname: string;
    isAuthenticated: boolean;
    profileComplete: boolean;
    userAgent?: string;
    ip?: string;
  };
  decision?: {
    action: string;
    redirect?: {
      to: string;
      reason: string;
    };
  };
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  performance?: {
    duration: number;
  };
}

/**
 * Enhanced logging service for middleware operations
 * Provides structured logging with different levels and contexts
 */
export class MiddlewareLoggerService {
  private static readonly isProduction = process.env.NODE_ENV === 'production';
  private static readonly isDevelopment = process.env.NODE_ENV === 'development';
  
  /**
   * Logs middleware decisions with structured data
   */
  static logDecision(
    context: MiddlewareContext, 
    decision: MiddlewareDecision,
    duration?: number
  ): void {
    if (!this.shouldLog(LogLevel.DEBUG)) {
      return;
    }
    
    const logEntry = this.createLogEntry({
      level: LogLevel.DEBUG,
      message: 'Middleware decision made',
      context: this.extractContextData(context),
      decision: this.extractDecisionData(decision),
      performance: duration ? { duration } : undefined
    });
    
    this.writeLog(logEntry);
  }
  
  /**
   * Logs middleware errors with full context
   */
  static logError(
    error: Error, 
    context?: MiddlewareContext,
    additionalInfo?: Record<string, unknown>
  ): void {
    const logEntry = this.createLogEntry({
      level: LogLevel.ERROR,
      message: `Middleware error: ${error.message}`,
      context: context ? this.extractContextData(context) : this.getMinimalContext(),
      error: {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined
      }
    });
    
    // Add additional info if provided
    if (additionalInfo) {
      (logEntry as MiddlewareLogEntry & { additionalInfo: Record<string, unknown> }).additionalInfo = additionalInfo;
    }
    
    this.writeLog(logEntry);
    
    // In production, also send to error monitoring service
    if (this.isProduction) {
      this.sendToErrorMonitoring(error, context, additionalInfo);
    }
  }
  
  /**
   * Logs security-related events
   */
  static logSecurityEvent(
    event: string,
    context: MiddlewareContext,
    severity: 'low' | 'medium' | 'high' = 'medium'
  ): void {
    const logEntry = this.createLogEntry({
      level: severity === 'high' ? LogLevel.ERROR : LogLevel.WARN,
      message: `Security event: ${event}`,
      context: this.extractContextData(context)
    });
    
    // Add security-specific metadata
    (logEntry as MiddlewareLogEntry & { security: { event: string; severity: string; timestamp: string } }).security = {
      event,
      severity,
      timestamp: new Date().toISOString()
    };
    
    this.writeLog(logEntry);
  }
  
  /**
   * Logs performance metrics
   */
  static logPerformance(
    operation: string,
    duration: number,
    context?: MiddlewareContext
  ): void {
    if (!this.shouldLog(LogLevel.INFO)) {
      return;
    }
    
    const logEntry = this.createLogEntry({
      level: LogLevel.INFO,
      message: `Performance: ${operation}`,
      context: context ? this.extractContextData(context) : this.getMinimalContext(),
      performance: { duration }
    });
    
    this.writeLog(logEntry);
  }
  
  /**
   * Creates a structured log entry
   */
  private static createLogEntry(data: Partial<MiddlewareLogEntry>): MiddlewareLogEntry {
    return {
      timestamp: new Date().toISOString(),
      level: data.level || LogLevel.INFO,
      message: data.message || 'Middleware operation',
      context: data.context || this.getMinimalContext(),
      ...data
    };
  }
  
  /**
   * Extracts relevant context data for logging
   */
  private static extractContextData(context: MiddlewareContext) {
    const { request, auth, page } = context;
    
    return {
      pathname: page.pathname,
      isAuthenticated: auth.isAuthenticated,
      profileComplete: auth.profileComplete,
      userAgent: this.isDevelopment ? request.headers.get('user-agent') || undefined : undefined,
      ip: this.getClientIP(request)
    };
  }
  
  /**
   * Extracts decision data for logging
   */
  private static extractDecisionData(decision: MiddlewareDecision) {
    return {
      action: decision.action,
      redirect: decision.redirect ? {
        to: decision.redirect.to,
        reason: decision.redirect.reason
      } : undefined
    };
  }
  
  /**
   * Gets minimal context when full context is not available
   */
  private static getMinimalContext() {
    return {
      pathname: 'unknown',
      isAuthenticated: false,
      profileComplete: false
    };
  }
  
  /**
   * Determines if logging should occur based on level and environment
   */
  private static shouldLog(level: LogLevel): boolean {
    if (this.isProduction) {
      // In production, only log warnings and errors
      return level === LogLevel.WARN || level === LogLevel.ERROR;
    }
    
    // In development, log everything
    return true;
  }
  
  /**
   * Writes log entry to appropriate output
   */
  private static writeLog(logEntry: MiddlewareLogEntry): void {
    const logMethod = this.getLogMethod(logEntry.level);
    
    if (this.isDevelopment) {
      // Pretty print in development
      logMethod(`[Middleware ${logEntry.level.toUpperCase()}]`, logEntry);
    } else {
      // Structured JSON in production
      logMethod(JSON.stringify(logEntry));
    }
  }
  
  /**
   * Gets appropriate console method for log level
   */
  private static getLogMethod(level: LogLevel) {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }
  
  /**
   * Extracts client IP address from request
   */
  private static getClientIP(request: { headers: { get: (key: string) => string | null }; ip?: string }): string | undefined {
    if (!this.isDevelopment) {
      return undefined; // Don't log IPs in production for privacy
    }
    
    return request.headers.get('x-forwarded-for') ||
           request.headers.get('x-real-ip') ||
           request.ip ||
           'unknown';
  }
  
  /**
   * Sends error to external monitoring service (placeholder)
   */
  private static sendToErrorMonitoring(
    error: Error,
    context?: MiddlewareContext,
    additionalInfo?: Record<string, unknown>
  ): void {
    // Placeholder for external error monitoring integration
    // Could integrate with services like Sentry, LogRocket, etc.
    console.error('[Error Monitoring]', {
      error: error.message,
      context: context ? this.extractContextData(context) : undefined,
      additionalInfo
    });
  }
}