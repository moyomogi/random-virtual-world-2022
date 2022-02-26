/**
 * @file vue-awesome-swiper
 * @module plugins/vue-awesome-swiper
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// https://github.com/davecat/vue-awesome-swiper
// If used in Nuxt.js/SSR, you should keep it only in browser build environment
// The `Process. BROWSER_BUILD` itself is just a feature, it is only valid in Nuxt.js, you need to modify it according to your own procedures, such as: in vue official ssr scaffolding it should be` process.browser`
if (process.browser) {
  Vue.use(VueAwesomeSwiper)
}
