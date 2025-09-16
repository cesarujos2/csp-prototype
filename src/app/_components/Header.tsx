"use client";

import Link from "next/link";
import { PageRoutesConfigService } from "../_services/page-routes-config.service";
import { Token } from "@mui/icons-material";


interface HeaderProps {
    /**
     * Additional action buttons (for multiple actions)
     */
    components?: React.ReactNode[];
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Custom logo configuration
     */
    logo?: {
        text?: string;
        icon?: React.ReactNode;
        href?: string;
    };
    /**
     * Children elements to render at the end of the header (e.g., user dropdown, custom components)
     * These will be displayed after all other header elements with proper spacing
     */
    children?: React.ReactNode;
}

/**
 * Reusable Header Component
 * Follows Clean Architecture principles with flexible action configuration
 * Now supports custom children elements for enhanced reusability
 */
export function Header({
    components = [],
    className = "",
    logo,
    children
}: HeaderProps) {
    const defaultLogo = {
        text: "Citype",
        icon: <Token sx={{ fontSize: 24 }} className="text-primary" />,
        href: PageRoutesConfigService.getPath('HOME')
    };

    const finalLogo = { ...defaultLogo, ...logo };

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md ${className}`}> 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <Link
                        href={finalLogo.href}
                        className="flex items-center space-x-2"
                    >
                        {finalLogo.icon}
                        <h1 className="text-xl font-semibold text-foreground">{finalLogo.text}</h1>
                    </Link>

                    {/* Navigation Actions */}
                    <div className="flex items-center gap-2">
        
                        {components.length > 0 && (
                            <>
                                <div className="flex items-center gap-2">
                                    {components.map((component) => 
                                        (component as React.ReactNode)
                                    )}
                                </div>
                            </>
                        )}

                        {/* Custom Children (e.g., user dropdown, custom components) */}
                        {children && (
                            <>
                                <div className="h-6 w-[1px] bg-divider/20" />
                                <div className="flex items-center">
                                    {children}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}