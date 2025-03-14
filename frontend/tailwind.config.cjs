/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        "fes-blue": "#1e3a8a",
        "fes-teal": "#0d9488",
        "fes-amber": "#f59e0b",
        "fes-terracotta": "#c2410c",
        "fes-cream": "#fef3c7",
      },
      backgroundImage: {
        "fes-pattern":
          "url('https://images.unsplash.com/photo-1548018560-c7196548e84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
