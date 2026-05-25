import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#07080d",
        ink: "#0d1019",
        graphite: "#171b28",
        pearl: "#f7f7fb",
        acid: "#b7ff5f",
        aurora: "#5ee7df",
        coral: "#ff6b7a",
        royal: "#8f6cff"
      },
      boxShadow: {
        glow: "0 0 44px rgba(94, 231, 223, .16), inset 0 1px 0 rgba(255,255,255,.08)",
        button: "0 18px 50px rgba(183,255,95,.18), inset 0 1px 0 rgba(255,255,255,.28)"
      },
      animation: {
        "soft-pulse": "softPulse 2.8s ease-in-out infinite",
        "scan": "scan 1.35s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite"
      },
      keyframes: {
        softPulse: {
          "0%, 100%": { opacity: ".62", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.015)" }
        },
        scan: {
          "0%": { transform: "translateX(-110%)" },
          "100%": { transform: "translateX(110%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
