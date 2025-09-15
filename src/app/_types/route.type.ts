import { API_ROUTES, PAGE_ROUTES } from "../_config/routes";

export interface RouteData {
  path: string;
  isPublic: boolean;
}

export type ApiRoute = keyof typeof API_ROUTES;
export type ApiRouteData = RouteData;

export type PageRoute = keyof typeof PAGE_ROUTES;
export interface PageRouteData extends RouteData {
  meta: PageRouteMetadata;
}
export interface PageRouteMetadata {
  title: string;
  description: string;
}