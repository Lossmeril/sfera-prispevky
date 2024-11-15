import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        drevo: "var(--drevo)",
        kov: "var(--kov)",
        grafika: "var(--grafika)",
        textil: "var(--textil)",
        chemie: "var(--chemie)",
        prirodopis: "var(--prirodopis)",
        fyzika: "var(--fyzika)",
        it: "var(--it)",
        sos: "var(--sos)",
        hriste: "var(--hriste)",
        tabory: "var(--tabory)",
        kreativniuceni: "var(--kreativniuceni)",

        accent: { pink: "var(--accent-pink)",
          red: "var(--accent-red)",
          orange: "var(--accent-orange)",
          yellow: "var(--accent-yellow)",
          lime: "var(--accent-lime)",
          green: "var(--accent-green)",
          blue: "var(--accent-blue)",
          purple: "var(--accent-purple)",
          brown: "var(--accent-brown)",
          gray: "var(--accent-gray)",
        }
      },
      fontFamily: {
        youth: ["var(--youth)"],
        youthRounded: ["var(--youth-rounded)"],
        aptos: ["var(--aptos)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
