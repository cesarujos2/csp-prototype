"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ProfileCompletionForm } from "./_components/ProfileCompletionForm";
import { usePageRouter } from "../_hooks/usePageRouter";
import { CompleteProfileHeader } from "./_components/CompleteProfileHeader";
import { UserProfileDisplay } from "./_components/UserProfileDisplay";

export default function CompleteProfilePage() {
  const { data: session, status } = useSession();
  const router = usePageRouter();

  useEffect(() => {
    // If not authenticated, redirect to auth page
    if (status === "unauthenticated") {
      router.getPath("AUTH");
      return;
    }
  }, [session, status, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/3">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground-500">Cargando...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if redirecting
  if (!session || session.user.profileComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <CompleteProfileHeader />

      <div className="flex flex-col md:flex-row md:items-center md:justify-center p-8 max-w-6xl mx-auto gap-6 md:gap-12 min-h-[calc(100vh-64px)]">
        {/* Left Side - User Info and Welcome */}
        <div className="flex flex-col items-center md:items-start md:w-1/2 md:max-w-md space-y-8">
          {/* User Profile Display - Compact on mobile */}
          <div>
            <UserProfileDisplay />
          </div>

          {/* Welcome Section - Compressed on mobile */}
          <div className="text-center md:text-left space-y-1 md:space-y-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary-500 dark:text-primary-400">
              ¡Bienvenido a Citype!
            </h1>
            <p className="text-default-600 text-xs md:text-sm">
              Para acceder al sistema, necesitamos completar tu información de perfil.
            </p>
            <p className="text-xs text-default-500 hidden md:block">
              Esta información es necesaria para el funcionamiento del sistema de seguridad municipal.
            </p>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 md:max-w-md flex-shrink-0">
          <ProfileCompletionForm
            onComplete={() => {
              // Redirect to dashboard after successful completion
              router.goTo("DASHBOARD");
            }}
          />
        </div>
      </div>
    </div>
  );
}