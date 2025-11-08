import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        youth: ["var(--youth)"],
        youthRounded: ["var(--youth-rounded)"],
        aptos: ["var(--aptos)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
