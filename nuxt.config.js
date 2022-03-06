const TITLE = "Random Virtual World";
const DESC =
  "Random Virtual World は大阪府立大学の部活、コンピューターハウスランダムの作品展示リレー企画です。中止になった 2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽) を展示します。無料でダウンロード・ウェブ上でプレイできます。";
export default {
  ssr: true,
  spa: true, // 静的ページか

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: TITLE,
    titleTemplate: `%s | ${TITLE}`,
    htmlAttrs: {
      lang: "jp",
      prefix: "og: http://ogp.me/ns#",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: TITLE,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: TITLE,
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://vuetest-103b3.web.app",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:image", property: "og:image", content: "/ogp.jpg" },
      {
        hid: "og:description",
        property: "og:description",
        content: DESC,
      },
      {
        hid: "description",
        name: "description",
        content: DESC,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@c_h_random" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/global.css", "swiper/css/swiper.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // mode: 'client': avoid SSR (CSR only)
    { src: "~/plugins/firebase", mode: "client" },
    { src: "~/plugins/define" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // target
  target: "static", // `nuxt generate` (firebase 等の static hosting 用)
  // target: "server",  // `nuxt build` (heroku 等の node.js hosting 用)

  // Only imported during dev and build time: https://go.nuxtjs.dev/config-modules
  // https://go.nuxtjs.dev/tailwindcss
  buildModules: ["@nuxt/postcss8", "@nuxtjs/tailwindcss"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // ビルド高速化 https://tech.contracts.co.jp/entry/2020/12/14/161147
    parallel: true,
    cache: true,
    // hardSource: true,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
