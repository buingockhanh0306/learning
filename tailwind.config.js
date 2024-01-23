module.exports = {
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        magesta: ["magesta", "serif"],
        qwigley: "qwigley",
        delaGothic: "delaGothic",
        led: "led",
      },
      colors: {
        primary: "#fff", // Example primary color
        textPrimary: "#7E7D82",
        inputSearch: "#F7F6F9",
        textBold: "#2C2C2C",
        secondary: "#F7F6F9", // Example secondary color
        backgroundHover: "#EFE9FF",
        textHover: "#4d5bc8",
        textLink: "#0ea5e9",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.67rem",
        "3xl": "1.953rem",
        "4xl": "2rem",
        "5xl": "3.052rem",
        "6xl": "6.052rem",
        big: "15rem",
      },
      height: {
        header: "6rem",
      },
      width: {
        sidebar: "18rem",
      },
      screens: {
        mobile: "0px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      animation: {
        slideIn: "slideIn 0.3s ease-in-out",
        slideOut: "slideOut 0.3s ease-in-out",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
  purge: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.js",
    "./nuxt.config.js",
  ],
};
