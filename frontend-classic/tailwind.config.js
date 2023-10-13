function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px"
    },
    extend: {
      colors: {
        skin: {
          fill: withOpacity("--color-fill"),
          inverted: withOpacity("--color-fill"),
          accent: withOpacity("--color-accent"),
          base: withOpacity("--color-text-base")
        }
      },
      backgroundColor: {
        skin: {
          card: withOpacity("--color-card"),
          "card-muted": withOpacity("--color-card-muted")
        }
      },
      borderColor: {
        skin: {
          line: withOpacity("--color-border"),
          fill: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent")
        }
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
