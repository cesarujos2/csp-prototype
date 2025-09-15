import { useRouter } from "next/navigation";
import { PageRoute } from "../_types/route.type";
import { PageRoutesConfigService } from "../_services/page-routes-config.service";

export function usePageRouter() {
    const router = useRouter();
    
    return {
        // Router methods from next/navigation
        push: router.push,
        replace: router.replace,
        back: router.back,
        forward: router.forward,
        refresh: router.refresh,
        
        // Static methods from PageRoutesConfigService
        getAll: PageRoutesConfigService.getAll,
        getPath: PageRoutesConfigService.getPath,
        getRoute: PageRoutesConfigService.getRoute,
        getMeta: PageRoutesConfigService.getMeta,
        
        // Custom navigation method
        goTo: (key: PageRoute) => {
            router.push(PageRoutesConfigService.getPath(key));
        }
    };
}