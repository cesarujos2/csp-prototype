import {heroui} from "@heroui/theme"

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
      colors: {
        // Custom color palette
        'deep-blue': '#03045e',
        'ocean-blue': '#0077b6',
        'sky-blue': '#00b4d8',
        'light-blue': '#90e0ef',
        'pale-blue': '#caf0f8',
        'ice-white': '#f7feff',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
          background: "#ffffff", // Pure white for better contrast
          foreground: "#11181c", // Dark gray for text
          focus: "#006fee",
          
          // Default colors for HeroUI compatibility
          default: {
            50: "#f8f9fa",
            100: "#f1f3f5",
            200: "#e9ecef",
            300: "#dee2e6",
            400: "#ced4da",
            500: "#adb5bd",
            600: "#6c757d",
            700: "#495057",
            800: "#343a40",
            900: "#212529",
            DEFAULT: "#e9ecef",
            foreground: "#11181c", // Dark text on default background
          },
          
          primary: {
            50: "#e6f1fe",
            100: "#cce3fd",
            200: "#99c7fb",
            300: "#66aaf9",
            400: "#338ef7",
            500: "#006fee", // Main primary - blue
            600: "#005bc4",
            700: "#004493",
            800: "#002e62",
            900: "#001731",
            DEFAULT: "#006fee",
            foreground: "#ffffff", // White text on primary
          },
          
          secondary: {
            50: "#f8f9fa",
            100: "#f1f3f5",
            200: "#e9ecef",
            300: "#dee2e6",
            400: "#ced4da",
            500: "#adb5bd",
            600: "#6c757d",
            700: "#495057",
            800: "#343a40",
            900: "#212529",
            DEFAULT: "#6c757d",
            foreground: "#ffffff",
          },
          
          success: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e", // Green
            600: "#16a34a",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
            DEFAULT: "#22c55e",
            foreground: "#ffffff",
          },
          
          warning: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b", // Amber/Orange
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
            DEFAULT: "#f59e0b",
            foreground: "#ffffff",
          },
          
          danger: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444", // Red
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d",
            DEFAULT: "#ef4444",
            foreground: "#ffffff",
          },
        },
      },
      
      dark: {
        colors: {
          background: "#000000", // Pure black
          foreground: "#ffffff", // White text
          focus: "#006fee",
          
          // Default colors for HeroUI compatibility
          default: {
            50: "#212529",
            100: "#343a40",
            200: "#495057",
            300: "#6c757d",
            400: "#adb5bd",
            500: "#ced4da",
            600: "#dee2e6",
            700: "#e9ecef",
            800: "#f1f3f5",
            900: "#f8f9fa",
            DEFAULT: "#495057",
            foreground: "#ffffff", // White text on default background
          },
          
          primary: {
            50: "#001731",
            100: "#002e62",
            200: "#004493",
            300: "#005bc4",
            400: "#006fee",
            500: "#338ef7", // Lighter blue for dark mode
            600: "#66aaf9",
            700: "#99c7fb",
            800: "#cce3fd",
            900: "#e6f1fe",
            DEFAULT: "#338ef7",
            foreground: "#000000", // Black text on primary for contrast
          },
          
          secondary: {
            50: "#212529",
            100: "#343a40",
            200: "#495057",
            300: "#6c757d",
            400: "#adb5bd",
            500: "#ced4da",
            600: "#dee2e6",
            700: "#e9ecef",
            800: "#f1f3f5",
            900: "#f8f9fa",
            DEFAULT: "#6c757d",
            foreground: "#ffffff",
          },
          
          success: {
            50: "#14532d",
            100: "#166534",
            200: "#15803d",
            300: "#16a34a",
            400: "#22c55e",
            500: "#4ade80", // Lighter green
            600: "#86efac",
            700: "#bbf7d0",
            800: "#dcfce7",
            900: "#f0fdf4",
            DEFAULT: "#4ade80",
            foreground: "#000000",
          },
          
          warning: {
            50: "#78350f",
            100: "#92400e",
            200: "#b45309",
            300: "#d97706",
            400: "#f59e0b",
            500: "#fbbf24", // Lighter amber
            600: "#fcd34d",
            700: "#fde68a",
            800: "#fef3c7",
            900: "#fffbeb",
            DEFAULT: "#fbbf24",
            foreground: "#000000",
          },
          
          danger: {
            50: "#7f1d1d",
            100: "#991b1b",
            200: "#b91c1c",
            300: "#dc2626",
            400: "#ef4444",
            500: "#f87171", // Lighter red
            600: "#fca5a5",
            700: "#fecaca",
            800: "#fee2e2",
            900: "#fef2f2",
            DEFAULT: "#f87171",
            foreground: "#000000",
          },
        },
      },
    },
  })],
}

module.exports = config;