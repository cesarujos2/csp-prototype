import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    addCommonColors: true, // ✅ deja success, warning, danger por defecto
    themes: {
      light: {
        colors: {
          background: "#f3f4f6",
          foreground: "#2d2d2d", // 🔹 gris elegante, no negro puro
          focus: "#0A3D91",

          default: {
            50: "#f9fafb",
            100: "#f3f4f6",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
            DEFAULT: "#e5e7eb",
            foreground: "#2d2d2d",
          },

          primary: {
            50: "#e8f1fb",
            100: "#d0e3f7",
            200: "#a1c7ef",
            300: "#72abe7",
            400: "#438fdf",
            500: "#1563c0",
            600: "#104d97",
            700: "#0c3a72",
            800: "#08274d",
            900: "#05152a",
            DEFAULT: "#1563c0",
            foreground: "#ffffff",
          },

          secondary: {
            50: "#e6faf7",
            100: "#b8f1ea",
            200: "#8ae8dd",
            300: "#5cdecf",
            400: "#2ed4c2",
            500: "#0fb5a3",
            600: "#0c8d7f",
            700: "#09645c",
            800: "#063c38",
            900: "#031d1a",
            DEFAULT: "#0fb5a3",
            foreground: "#ffffff",
          },
        },
      },

      dark: {
        colors: {
          background: "#0d1117",
          foreground: "#e4e4e4", // 🔹 gris claro, no blanco puro
          focus: "#1563c0",

          default: {
            50: "#111827",
            100: "#1f2937",
            200: "#374151",
            300: "#4b5563",
            400: "#6b7280",
            500: "#9ca3af",
            600: "#d1d5db",
            700: "#e5e7eb",
            800: "#f3f4f6",
            900: "#f9fafb",
            DEFAULT: "#374151",
            foreground: "#e4e4e4",
          },

          primary: {
            50: "#05152a",
            100: "#08274d",
            200: "#0c3a72",
            300: "#104d97",
            400: "#1563c0",
            500: "#438fdf",
            600: "#72abe7",
            700: "#a1c7ef",
            800: "#d0e3f7",
            900: "#e8f1fb",
            DEFAULT: "#438fdf",
            foreground: "#ffffff",
          },

          secondary: {
            50: "#031d1a",
            100: "#063c38",
            200: "#09645c",
            300: "#0c8d7f",
            400: "#0fb5a3",
            500: "#2ed4c2",
            600: "#5cdecf",
            700: "#8ae8dd",
            800: "#b8f1ea",
            900: "#e6faf7",
            DEFAULT: "#2ed4c2",
            foreground: "#ffffff",
          },
        },
      },
    },
  })],
};

module.exports = config;
