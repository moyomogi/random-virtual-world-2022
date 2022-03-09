const TITLE = "Random Virtual World";
const DESC =
  "Random Virtual World は大阪府立大学の部活、コンピューターハウスランダムの作品展示リレー企画です。中止になった 2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽) を展示します。無料でダウンロード・ウェブ上でプレイできます。";

export default {
  // SPA, SSR, SSG https://shimablogs.com/spa-ssr-ssg-difference
  ssr: true, // true: SSR, SSG, false: SPA(=CSR)

  // 1. GH Pages 等の static hosting のとき
  // target: "static", $ nuxt generate
  // 2. Heroku 等の node.js hosting
  // target: "server", $ nuxt build
  target: process.env.TARGET || "server",
  // Firebase Hosting にデプロイするときは static にする。
  // Heroku にデプロイするときは server にする。

  // Config for Heroku
  // process.env.PORT は環境変数です。
  // cf 環境変数 https://qiita.com/theFirstPenguin/items/89444431a6a590aa4784
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },

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
        content: "https://vuetest-103b3.herokuapp.com",
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
    { src: "~/plugins/bindSwiper", mode: "client" },
    { src: "~/plugins/firebase" },
    { src: "~/plugins/define" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Only imported during dev and build time: https://go.nuxtjs.dev/config-modules
  // https://go.nuxtjs.dev/tailwindcss
  buildModules: ["@nuxt/postcss8", "@nuxtjs/tailwindcss"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // ビルド高速化 https://tech.contracts.co.jp/entry/2020/12/14/161147
    // `parallel: true` にするとバグる https://lifesaver.codes/answer/how-do-i-fix-nuxt-warning-nuxt-build-finished-but-did-not-exit-after-5s-5669
    // parallel: true,
    cache: true,
    // hardSource: true,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    // https://lifesaver.codes/answer/vendor-is-too-big-2201
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
        name: "test",
        maxSize: 256000,
      },
    },
  },
};
