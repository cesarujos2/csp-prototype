'use client'

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider, ThemeProviderProps } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <ThemeProvider {...themeProps}>
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}