import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  plugins: [nextui()],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|image|ripple|spinner).js"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        destructive: "#900808",
        grad1: "rgba(62, 62, 62, 0.7)",
        grad2: "rgba(34, 34, 34, 0.50)",
        glass1: "rgba(255,255,255,0.2)",
        glass2: "rgba(255,255,255,0.05)",
        background: "#121212",
        green: "#1ED760",
        dark_green: "#174126",
        title_gray: "#959393",
        
        blue: {
          500: "#79B5EC",
          600: "#152432",
        },
        red: {
          500: "#F37877",
          600: "#3E1716",
          700: "#F24E43",
        },
        light: {
          200: "#E8E9E9",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
      },
      fontFamily: {
        popins: ["poppins" , "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  // plugins: [require(tailwindcss-animate),nextui()],
} satisfies Config;

// export default config;