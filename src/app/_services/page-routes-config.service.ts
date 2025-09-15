import { PAGE_ROUTES } from "../_config/routes";
import { PageRoute, PageRouteData, PageRouteMetadata } from "../_types/route.type";

/**
 * Static service class for Page routes configuration
 */
export class PageRoutesConfigService {

  static getAll(): Record<PageRoute, PageRouteData> {
    return PAGE_ROUTES;
  }

  static getPath(key: PageRoute): string {
    return PAGE_ROUTES[key].path;
  }

  static getMeta(key: PageRoute): PageRouteMetadata {
    return PAGE_ROUTES[key].meta;
  } 

  static getRouteByPath(path: string): PageRouteData | null {
    for (const key in PAGE_ROUTES) {
      const keyAsPageRoute = key as PageRoute;
      if (PAGE_ROUTES[keyAsPageRoute].path === path) {
        return PAGE_ROUTES[keyAsPageRoute];
      }
    }
    return null;
  }

  static getRoute(key: PageRoute): PageRouteData {
    return PAGE_ROUTES[key];
  }

  static isRoute(path: string, key: PageRoute): boolean {
    return PAGE_ROUTES[key].path === path;
  }
}