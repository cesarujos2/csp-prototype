"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePageRouter } from "../_hooks/usePageRouter";
import { DashboardHeader } from "./_components/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard Layout Component
 * Provides the base structure for all dashboard pages
 * Includes sidebar navigation, header, and main content area
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = usePageRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.goTo("AUTH");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground-500">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <DashboardHeader />
      
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-6">
            {children}
        </main>
      </div>
    </div>
  );
}