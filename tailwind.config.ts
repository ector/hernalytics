import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      jost: ["var(--font-jost)"],
      spaceGrotesk: ["var(--font-space-grotesk)"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "home-intro-gradient":
          "linear-gradient(254deg, rgba(0, 0, 0, 0.00) -10.69%, rgba(0, 0, 0, 0.60) 52.96%), linear-gradient(0deg, rgba(0, 59, 84, 0.70) 0%, rgba(0, 59, 84, 0.70) 100%)",
        "home-get-report-gradient":
          "linear-gradient(254deg, rgba(0, 0, 0, 0.00) -10.69%, rgba(0, 0, 0, 0.60) 52.96%), linear-gradient(268deg, #274D53 -0.83%, rgba(39, 77, 83, 0.00) 35.14%, #274D53 99.08%)",
        "setting-mesh-bg-gradient":
          "linear-gradient(254deg, #2AFF22 -10%, #16A3C0 20%, #828BE4 90%, #82BEE4 100%)",
        },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          cOrange05: "#E5B805",
          cRed00: "#732900",
          cRed99: "#e1d5c299",
          cYellow08: "#8F7408",
          cYellow99: "#e5d79c99",
          cBlueEC: "#4FD8EC",
          cBlueCF: "#23BCCF",
          cBlueFF: "#D0F8FF",
          cBlue6F: "#002C6F",
          cBlue73: "#005073",
          cBlueD1: "#3299D1",
          cGreen76: "#006A76",
          cGreen74: "#006874",
          cGreen34: "#1F3134",
          cGreen4D: "#00344D",
          cGreen54: "#003B54",
          cGreen24: "#001F24",
          cGreen53: "#274D53",
          cGreen0D: "#0068740d",
          cGreen06: "#009306",
          cGreenD4D: "#4b6f4d4d",
          cGrey92: "#8E9192",
          cGreyAC: "#A9ACAC",
          cGrey70: "#707070",
          cGrey7B: "#6F797B",
          cGrey78: "#747878",
          cGreyFA: "#F8FAFA",
          cGreyCA: "#BFC8CA",
          cDark42: "#363C42",
          cDark65: "#3B4665",
          cDark1D: "#191C1D",
          cDark1E: "#191C1E",
          cDark2E: "#001E2E",
          cDark24: "#001F24",
          cDark7D: "#535E7D",
          cDark20: "#181B20",
          cDark3A: "#21363A",
          cDark32: "#2E3132",
          cLightED: "#E3E8ED",
          cLightF1: "#EFF1F1",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
