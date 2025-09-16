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
  OWNER: {
    path: '/dashboard/owner',
    isPublic: false,
    meta: {
      title: 'Panel de Propietario',
      description: 'Panel de control para propietarios del sistema',
    },
  },
  ADMIN: {
    path: '/dashboard/admin',
    isPublic: false,
    meta: {
      title: 'Panel de Administrador',
      description: 'Panel de control para administradores',
    },
  },
  MONITORING: {
    path: '/dashboard/monitoring',
    isPublic: false,
    meta: {
      title: 'Panel de Monitoreo',
      description: 'Panel de monitoreo y supervisión',
    },
  },
  OFFICER: {
    path: '/dashboard/officer',
    isPublic: false,
    meta: {
      title: 'Panel de Oficial',
      description: 'Panel de control para oficiales',
    },
  },
  USER: {
    path: '/dashboard/user',
    isPublic: false,
    meta: {
      title: 'Panel de Usuario',
      description: 'Panel de control para usuarios',
    },
  },
} as const satisfies Record<string, PageRouteData>;