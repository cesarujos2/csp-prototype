"use client";

import { Button } from "@heroui/react";
import { ThemeSwitch } from "./theme-switch";
import { useRouter, usePathname } from "next/navigation";
import {
    People as Users,
    Fingerprint
} from "@mui/icons-material";
import Link from "next/link";
import { ROUTES, NavigationService } from "../_config/routes";

interface HeaderProps {
    /**
     * Show authentication button
     */
    showAuthButton?: boolean;
    /**
     * Custom authentication button text
     */
    authButtonText?: string;
    /**
     * Custom back button text (for auth page)
     */
    backButtonText?: string;
    /**
     * Additional CSS classes
     */
    className?: string;
}

/**
 * Reusable Header Component
 * Follows Clean Architecture principles with centralized route management
 */
export function Header({
    showAuthButton = true,
    authButtonText = "Iniciar sesión",
    backButtonText = "Volver al inicio",
    className = ""
}: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    
    const isAuthPage = NavigationService.isCurrentRoute(pathname, 'AUTH');

    const handleNavigation = (routeKey: keyof typeof ROUTES) => {
        const route = NavigationService.getRoute(routeKey);
        router.push(route);
    };

    const handleAuthAction = () => {
        if (isAuthPage) {
            handleNavigation('HOME');
        } else {
            handleNavigation('AUTH');
        }
    };

    const getAuthButtonText = () => {
        return isAuthPage ? backButtonText : authButtonText;
    };

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-xl bg-background/80 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <Link 
                        href={NavigationService.getRoute('HOME')} 
                        className="flex items-center space-x-2"
                    >
                        <Fingerprint sx={{ fontSize: 24 }} className="text-primary" />
                        <h1 className="text-xl font-semibold text-foreground">Citype</h1>
                    </Link>

                    {/* Navigation Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeSwitch />
                        
                        {showAuthButton && (
                            <>
                                <div className="h-6 w-[1px] bg-divider/20" />
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="font-medium hover:bg-primary/5 transition-colors"
                                    startContent={<Users sx={{ fontSize: 18 }} />}
                                    onPress={handleAuthAction}
                                >
                                    {getAuthButtonText()}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

/**
 * Header variants for specific pages
 */
export const HomeHeader = () => (
    <Header 
        showAuthButton={true}
        authButtonText="Iniciar sesión"
        className="backdrop-blur-md"
    />
);

export const AuthHeader = () => (
    <Header 
        showAuthButton={true}
        backButtonText="Volver al inicio"
    />
);