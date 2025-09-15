"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import { usePageRouter } from "../_hooks/usePageRouter";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = usePageRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.goTo("AUTH");
        }
    }, [status, router]);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: router.getPath("AUTH") });
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-foreground-500">Cargando...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/3">
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Dashboard General
                                </h1>
                                <p className="text-foreground-500">
                                    Bienvenido al sistema Citype
                                </p>
                            </div>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={handleSignOut}
                            >
                                Cerrar Sesión
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Información del Usuario
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-foreground-600">
                                        <span className="font-medium">Nombre:</span> {session.user?.name || "No disponible"}
                                    </p>
                                    <p className="text-foreground-600">
                                        <span className="font-medium">Email:</span> {session.user?.email}
                                    </p>
                                    <p className="text-foreground-600">
                                        <span className="font-medium">Rol:</span> {(session.user as { role?: string })?.role || "USER"}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Estado del Sistema
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-foreground-600">Autenticación: Activa</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-foreground-600">Base de datos: Conectada</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-foreground-600">Sesión: Válida</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Próximas Funcionalidades
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="font-medium text-foreground mb-2">Panel de Administración</h4>
                                    <p className="text-sm text-foreground-500">Para usuarios con rol ADMIN</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="font-medium text-foreground mb-2">Centro de Monitoreo</h4>
                                    <p className="text-sm text-foreground-500">Para usuarios con rol MONITORING</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="font-medium text-foreground mb-2">Panel de Guardias</h4>
                                    <p className="text-sm text-foreground-500">Para usuarios con rol OFFICER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}