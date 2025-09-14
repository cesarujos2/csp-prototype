"use client";

import { Button } from "@heroui/react";
import { AuthHeader } from "../_components/header";
import { Google } from "@mui/icons-material";

export default function AuthPage() {


    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/3">
            {/* Header */}
            <AuthHeader />

            {/* Main Content */}
            <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row">
                {/* Left Side - Branding & Welcome */}
                <div className="flex md:w-1/2 items-center justify-center px-6 py-6 md:px-8 md:py-12 lg:px-16">
                    <div className="max-w-lg text-center md:text-left space-y-4 md:space-y-8">
                        <div className="space-y-3 md:space-y-6">

                            <div className="space-y-2 md:space-y-4">
                                <h1 className="text-2xl md:text-lg lg:text-xl font-bold text-foreground leading-tight">
                                    Bienvenido a
                                    <br />
                                    <span className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                                        Citype
                                    </span>
                                </h1>

                                <p className="text-md md:text-lg text-foreground-500 leading-relaxed max-w-md hidden md:block">
                                    Sistema de Seguridad Municipal potenciado por IA para optimizar rutas de patrullaje y gestionar incidentes ciudadanos.
                                </p>

                                <p className="text-sm text-foreground-500 leading-relaxed md:hidden">
                                    Sistema de Seguridad Municipal con IA
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Authentication */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-6 md:px-8 md:py-12 lg:px-16">
                    <div className="w-full max-w-sm space-y-6 md:space-y-10">
                        <div className="text-center space-y-1 md:space-y-3">
                            <h2 className="text-xl md:text-3xl font-bold text-foreground">
                                Iniciar Sesión
                            </h2>
                            <p className="text-xs md:text-base text-foreground-400">
                                Accede de forma segura
                            </p>
                        </div>

                        <div className="space-y-3 md:space-y-5">
                            <Button
                                size="md"
                                className="w-full h-11 md:h-14 font-medium bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl border-0 text-sm md:text-base"
                                startContent={<Google sx={{ fontSize: 20 }} className="text-[#4285F4] md:text-[24px]" />}
                            >
                                <span className="text-foreground-700">Google</span>
                            </Button>
                        </div>

                        <div className="text-center pt-4 md:pt-6">
                            <p className="text-xs text-foreground-300">
                                Al continuar, aceptas nuestros{" "}
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="p-1 h-auto"
                                >
                                    Términos
                                </Button>
                                {" "}y{" "}
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="p-1 h-auto"
                                >
                                    Privacidad
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}