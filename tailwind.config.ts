// Tailwindcss Imports
import type { Config } from "tailwindcss";

export default defineConfig();

function defineConfig(): Config {
  return {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      },
      screens: {
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1536px",
        "2xl": "1920px",
      },
    },
    plugins: [],
    important: "#__next",
    corePlugins: {
      preflight: true,
    },
  };
}
