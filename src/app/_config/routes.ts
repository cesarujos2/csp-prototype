/**
 * Application Routes Configuration
 * Centralized route management to avoid hardcoded URLs
 */

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];

/**
 * Navigation utilities
 */
export class NavigationService {
  /**
   * Get route by key
   */
  static getRoute(key: RouteKey): RouteValue {
    return ROUTES[key];
  }

  /**
   * Check if current path matches route
   */
  static isCurrentRoute(currentPath: string, routeKey: RouteKey): boolean {
    return currentPath === ROUTES[routeKey];
  }

  /**
   * Get all available routes
   */
  static getAllRoutes(): Record<RouteKey, RouteValue> {
    return ROUTES;
  }
}

/**
 * Route metadata for navigation components
 */
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Inicio',
    description: 'Página principal del sistema'
  },
  [ROUTES.AUTH]: {
    title: 'Autenticación',
    description: 'Iniciar sesión en el sistema'
  },
  [ROUTES.DASHBOARD]: {
    title: 'Panel de Control',
    description: 'Dashboard principal'
  },
} as const;