// const webpack = require('webpack')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RVW',
    htmlAttrs: {
      lang: 'jp'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    // script: [
    //   { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', type: 'text/javascript' }
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/tailwindcss@0.3.0/dist/tailwind.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css",
    'swiper/css/swiper.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // mode: 'client': avoid SSR (CSR only)
    { src: '~/plugins/firebase', mode: 'client' },
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // target
  target: 'static',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

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
  }
}
