// グローバル定数
// https://devsakaso.com/vue-js-img-in-assets/
// v-bind したい画像は assets でなく static に置く
const genresDict = {
  ACTION: {
    color: "magenta",
    genreUrl: "/slides/genre_action.png",
  },
  RPG: {
    color: "yellow",
    genreUrl: "/slides/genre_role_playing.png",
  },
  SHOOTING: {
    color: "cyan",
    genreUrl: "/slides/genre_shooting.png",
  },
  ETCETRA: {
    color: "magenta",
    genreUrl: "/slides/genre_etcetera.png",
  },
  SPORTS: {
    color: "yellow",
    genreUrl: "/slides/genre_desktop_music.png",
  },
};
export default (context, inject) => {
  // https://stackoverflow.com/questions/59235497/i-get-a-webpack-warning-critical-dependency-the-request-of-a-dependency-is-an-e
  // https://qiita.com/trantan/items/b9489b36debda52ea926
  // Object.keys(genresDict).forEach(async (k, v) => {
  //   console.log(k);
  //   genresDict[k].genresUrl.value = await require(v.genreUrl);
  // });
  inject("genresDict", genresDict);
};
