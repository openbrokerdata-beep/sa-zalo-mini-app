/** Design tokens — nguồn chuẩn: docs/05-ui-content-spec.md §2 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#0B4C3A", 700: "#123F36", 600: "#2A4F40", 50: "#E8F0EC" },
        gold: { DEFAULT: "#D39538", 600: "#B57A26", 100: "#F6E9D3" },
        cream: { DEFAULT: "#F7F3EA", 200: "#EFE8D8" },
        ink: { DEFAULT: "#1F2A26", muted: "#5B6661" },
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Times New Roman"', "serif"],
        sans: ['"Be Vietnam Pro"', "-apple-system", "Roboto", "sans-serif"],
      },
      spacing: { safe: "env(safe-area-inset-bottom)" },
    },
  },
  corePlugins: { preflight: false },
  plugins: [],
};
