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
    themes: {
      light: {
        colors: {
          background: "#f7feff", // ice-white
          foreground: "#03045e", // deep-blue
          primary: {
            50: "#caf0f8",
            100: "#90e0ef", 
            200: "#00b4d8",
            300: "#00b4d8",
            400: "#0077b6",
            500: "#0077b6", // Main primary
            600: "#03045e",
            700: "#03045e",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#0077b6",
            foreground: "#f7feff",
          },
          secondary: {
            50: "#caf0f8",
            100: "#90e0ef",
            200: "#00b4d8", 
            300: "#00b4d8",
            400: "#00b4d8",
            500: "#00b4d8", // Main secondary
            600: "#0077b6",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#00b4d8",
            foreground: "#f7feff",
          },
          success: {
            50: "#caf0f8",
            100: "#caf0f8",
            200: "#90e0ef",
            300: "#90e0ef",
            400: "#90e0ef",
            500: "#90e0ef", // Main success
            600: "#00b4d8",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#90e0ef",
            foreground: "#03045e",
          },
          warning: {
            50: "#caf0f8",
            100: "#caf0f8",
            200: "#90e0ef",
            300: "#00b4d8",
            400: "#00b4d8",
            500: "#00b4d8", // Main warning
            600: "#0077b6",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#00b4d8",
            foreground: "#f7feff",
          },
          danger: {
            50: "#caf0f8",
            100: "#90e0ef",
            200: "#00b4d8",
            300: "#0077b6",
            400: "#0077b6",
            500: "#03045e", // Main danger
            600: "#03045e",
            700: "#03045e",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#03045e",
            foreground: "#f7feff",
          },
        },
      },
      dark: {
        colors: {
          background: "#000000", // black
          foreground: "#f7feff", // ice-white
          primary: {
            50: "#f7feff",
            100: "#caf0f8",
            200: "#90e0ef",
            300: "#00b4d8",
            400: "#00b4d8",
            500: "#00b4d8", // Main primary
            600: "#0077b6",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#00b4d8",
            foreground: "#f7feff",
          },
          secondary: {
            50: "#f7feff",
            100: "#caf0f8",
            200: "#90e0ef",
            300: "#00b4d8",
            400: "#00b4d8",
            500: "#00b4d8", // Main secondary
            600: "#0077b6",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#00b4d8",
            foreground: "#f7feff",
          },
          success: {
            50: "#f7feff",
            100: "#caf0f8",
            200: "#caf0f8",
            300: "#90e0ef",
            400: "#90e0ef",
            500: "#90e0ef", // Main success
            600: "#00b4d8",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#90e0ef",
            foreground: "#03045e",
          },
          warning: {
            50: "#f7feff",
            100: "#caf0f8",
            200: "#90e0ef",
            300: "#00b4d8",
            400: "#00b4d8",
            500: "#00b4d8", // Main warning
            600: "#0077b6",
            700: "#0077b6",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#00b4d8",
            foreground: "#f7feff",
          },
          danger: {
            50: "#f7feff",
            100: "#caf0f8",
            200: "#90e0ef",
            300: "#00b4d8",
            400: "#0077b6",
            500: "#0077b6", // Main danger
            600: "#03045e",
            700: "#03045e",
            800: "#03045e",
            900: "#03045e",
            DEFAULT: "#0077b6",
            foreground: "#f7feff",
          },
        },
      },
    },
  })],
}

module.exports = config;