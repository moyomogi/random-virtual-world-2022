import Vue from "vue";

// https://github.com/davecat/vue-awesome-swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import VModal from "vue-js-modal";

if (process.browser) {
  Vue.use(VueAwesomeSwiper);
  Vue.use(VModal);
}

// グローバル定数
const genresDict = {
  ACTION: {
    id: "#action",
    color: "magenta",
    genreUrl: "/slides/genre_action.png",
  },
  RPG: {
    id: "#rpg",
    color: "yellow",
    genreUrl: "/slides/genre_role_playing.png",
  },
  SHOOTING: {
    id: "#shooting",
    color: "cyan",
    genreUrl: "/slides/genre_shooting.png",
  },
  ETCETRA: {
    id: "#etcetra",
    color: "magenta",
    genreUrl: "/slides/genre_etcetera.png",
  },
  SPORTS: {
    id: "#sports",
    color: "yellow",
    genreUrl: "/slides/genre_desktop_music.png",
  },
};
export default (context, inject) => {
  inject("genresDict", genresDict);
};
