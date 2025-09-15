import { API_ROUTES } from "../_config/routes";
import { ApiRoute, ApiRouteData } from "../_types/route.type";

/**
 * Static service class for API routes configuration
 */
export class ApiRoutesConfigService {
    static getAll(): Record<ApiRoute, ApiRouteData> {
        return API_ROUTES;
    }

    static getPath(key: ApiRoute): string {
        return API_ROUTES[key].path;
    }

    static getRoute(key: ApiRoute): ApiRouteData {
        return API_ROUTES[key];
    }
}