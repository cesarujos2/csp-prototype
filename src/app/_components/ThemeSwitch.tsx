"use client";

import { FC } from "react";
import { Button, ButtonProps } from "@heroui/button";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { DarkMode, LightMode } from "@mui/icons-material";

export interface ThemeSwitchProps {
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  radius?: ButtonProps["radius"];
  isDisabled?: boolean;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  size = "sm",
  variant = "light",
  color = "primary",
  radius = "lg",
  isDisabled = false,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const handlePress = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const isDarkMode = theme === "dark" && !isSSR;

  return (
    <Button
      isIconOnly
      className={className}
      size={size}
      variant={variant}
      color={color}
      radius={radius}
      isDisabled={isDisabled}
      onPress={handlePress}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? (
        <DarkMode sx={{ fontSize: size === "sm" ? 18 : size === "md" ? 20 : 24 }} />
      ) : (
        <LightMode sx={{ fontSize: size === "sm" ? 18 : size === "md" ? 20 : 24 }} />
      )}
    </Button>
  );
};
