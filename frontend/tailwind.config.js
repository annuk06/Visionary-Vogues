/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F1116",
          soft: "#171A21",
          line: "#262A35",
        },
        ivory: "#F3EFE7",
        muted: "#9AA0AE",
        gold: {
          DEFAULT: "#C9A667",
          soft: "#E4CFA0",
        },
        blush: {
          DEFAULT: "#D998A0",
          deep: "#B96B78",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(243,239,231,0.06) 1px, transparent 0)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        scan: "scan 2.4s linear infinite",
        fadeUp: "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
