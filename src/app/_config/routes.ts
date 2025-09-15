/**
 * Application Routes Configuration
 * Centralized route management to avoid hardcoded URLs
 */

import { PageRouteData, RouteData } from "../_types/route.type";

export const API_ROUTES = {
  AUTH_SIGNIN: {
    path: '/api/auth/signin',
    isPublic: true,
  },
  AUTH_CALLBACK: {
    path: '/api/auth/callback',
    isPublic: true,
  },
  USER_COMPLETE_PROFILE: {
    path: '/api/user/complete-profile',
    isPublic: false,
  },
} as const satisfies Record<string, RouteData>;

export const PAGE_ROUTES = {
  HOME: {
    path: '/',
    isPublic: true,
    meta: {
      title: 'Inicio',
      description: 'Página principal del sistema',
    },
  },
  AUTH: {
    path: '/auth',
    isPublic: true,
    meta: {
      title: 'Autenticación',
      description: 'Iniciar sesión en el sistema',
    },
  },
  DASHBOARD: {
    path: '/dashboard',
    isPublic: false,
    meta: {
      title: 'Panel de Control',
      description: 'Dashboard principal',
    },
  },
  COMPLETE_PROFILE: {
    path: '/complete-profile',
    isPublic: false,
    meta: {
      title: 'Completar Perfil',
      description: 'Completa tu perfil para acceder al sistema',
    },
  },
} as const satisfies Record<string, PageRouteData>;