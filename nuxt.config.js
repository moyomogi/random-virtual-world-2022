import { db } from "./plugins/firebase.js";
import { getDocs, collection } from "firebase/firestore";

const SITE_NAME = "Random Virtual World 2022";
const DESC =
  "Random Virtual World 2022 は大阪府立大学の部活、コンピューターハウスランダムの作品展示リレー企画です。中止になった 2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽) を展示します。無料でダウンロード・ウェブ上でプレイできます。";
const HOST_NAME = "https://rvw2022.herokuapp.com";
async function getRoutes() {
  const postsRef = collection(db, "posts");
  const documents = await getDocs(postsRef);
  if (!documents) return [];
  return documents.docs.map((document) => {
    let post = document.data();
    if (!post || !post.title) return "/";
    return `/posts/${post.title}`;
  });
}

export default {
  // https://zenn.dev/kouchanne/articles/83466e36e1c30f174ae8
  // https://stackoverflow.com/questions/59413786/can-not-access-process-env-variables-in-component-nuxt
  // https://cly7796.net/blog/javascript/try-using-runtimeconfig-in-nuxt-js/
  // publicRuntimeConfig: {
  //   API_KEY: process.env.API_KEY,
  //   AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  //   PROJECT_ID: process.env.PROJECT_ID,
  //   STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  //   MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  //   APP_ID: process.env.APP_ID,
  // },

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
    title: SITE_NAME,
    titleTemplate: `%s | ${SITE_NAME}`,
    htmlAttrs: {
      lang: "jp",
      prefix: "og: http://ogp.me/ns#",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "google-site-verification",
        content: "Gx18T3hkrzY9YZy_MAKgNWckKkWFZkFqK_-n6h5TBvQ",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // サイト名は SITE_NAME で固定
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: SITE_NAME,
      },
      // デフォルト値は SITE_NAME とした
      {
        hid: "og:title",
        property: "og:title",
        content: SITE_NAME,
      },
      {
        hid: "og:url",
        property: "og:url",
        content: HOST_NAME,
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

  // https://github.com/nomunomu0504/vue-awesome-swiper#local-registration
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

  // https://nishimura.club/nuxt-sitemap
  modules: ["@nuxtjs/sitemap"],
  sitemap: {
    path: "/sitemap.xml",
    hostname: HOST_NAME,
    gzip: true,
    exclude: ["/submit", "/update"],
    // https://zenn.dev/ysmtegsr/articles/f1cd20fb877dd8c8c154
    async routes() {
      return getRoutes().then((routes) =>
        routes.map((route) => {
          return {
            url: route,
            changefreq: "weekly",
            lastmod: new Date(),
            priority: 1,
          };
        })
      );
    },
  },

  // 使ってません
  generate: {
    routes() {
      return getRoutes();
    },
  },

  // Only imported during dev and build time: https://go.nuxtjs.dev/config-modules
  // https://go.nuxtjs.dev/tailwindcss
  buildModules: ["@nuxt/postcss8", "@nuxtjs/tailwindcss"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // ビルド高速化 https://tech.contracts.co.jp/entry/2020/12/14/161147
    // `parallel: true` にするとバグる https://lifesaver.codes/answer/how-do-i-fix-nuxt-warning-nuxt-build-finished-but-did-not-exit-after-5s-5669
    // parallel: process.env.DEBUG === null,
    // cache: process.env.DEBUG === null,
    // hardSource: process.env.DEBUG === null,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    // https://lifesaver.codes/answer/vendor-is-too-big-2201
    // webpack にて、分割し過ぎると、低速化するかも
    // optimization: {
    //   splitChunks: {
    //     // chunks: "all",
    //     automaticNameDelimiter: "-",
    //     name: "test",
    //     maxSize: 128000,
    //   },
    // },
  },
};
