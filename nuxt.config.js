export default {
  // mode: 'production',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "RVW | Computer House Random",
    htmlAttrs: {
      lang: "jp",
      prefix: "og: http://ogp.me/ns#",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "RVW は大阪府立大学の部活、コンピューターハウスランダムの作品展示リレー企画です。中止になった 2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽) を展示します。無料でダウンロード・ウェブ上でプレイできます。",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "RVW | Computer House Random",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://vuetest-103b3.firebaseapp.com",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "RVW | Computer House Random",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "RVW は大阪府立大学の部活、コンピューターハウスランダムの作品展示リレー企画です。中止になった 2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽) を展示します。無料でダウンロード・ウェブ上でプレイできます。",
      },
      { hid: "og:image", property: "og:image", content: "/base/ogp.jpg" },
      { name: "twitter:card", content: "summary" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/tailwindcss@0.3.0/dist/tailwind.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/global.css", "swiper/css/swiper.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // mode: 'client': avoid SSR (CSR only)
    { src: "~/plugins/firebase", mode: "client" },
    { src: "~/plugins/define", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // target
  target: "static",

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // https://go.nuxtjs.dev/tailwindcss
  buildModules: ["@nuxt/postcss8", "@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: [
  //   [
  //     '@nuxtjs/firebase',
  //     {
  //       config: {
  //         apiKey: 'AIzaSyBtJ2EN7_JznLs03fYngKzl0nN6F9-5G9I',
  //         authDomain: 'vuetest-103b3.firebaseapp.com',
  //         projectId: 'vuetest-103b3',
  //         storageBucket: 'vuetest-103b3.appspot.com',
  //         messagingSenderId: '640887077281',
  //         appId: '1:640887077281:web:a87322542e2246c1f2f3e0',
  //         measurementId: '<measurementId>'
  //       },
  //       // services: {
  //       //   auth: true // Just as example. Can be any other service.
  //       // }
  //     }
  //   ]
  // ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
