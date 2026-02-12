/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#050505", // Design Agent: Deep Black
        foreground: "#FFFFFF", // Design Agent: White
        primary: {
          DEFAULT: "#FF3B30", // Design Agent: Electric Red
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#888888",
          foreground: "#CCCCCC",
        },
        accent: {
          DEFAULT: "#FF3B30",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#0A0A0A",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#0A0A0A",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "0px", // Design Agent: Sharp edges
        md: "0px",
        sm: "0px",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        heading: ["Syne", "sans-serif"],
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
  plugins: [animate],
});
