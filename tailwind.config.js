module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  mode: "jit", // 保存時に自動リロード
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
