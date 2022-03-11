<template>
  <!-- swiper template https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/Test.vue -->
  <!-- fixed aspect ratio https://tailwindcss.jp/course/locking-images-to-a-fixed-aspect-ratio -->
  <article class="container px-2 pt-3 mb-8 mx-auto flex flex-wrap">
    <section
      v-for="(postIds, genre) in postGenresDict"
      :key="genre"
      class="
        container
        mx-auto
        md:px-6
        pt-6
        pb-1
        w-11/12
        md:w-1/2
        lg:w-1/3
        xl:w-1/4
      "
    >
      <!-- a の href で id に飛ばす用の虚無 -->
      <div :id="genre" class="-translate-y-24"></div>
      <!-- assets に置いた画像は require する必要がある
        https://omiend.hatenablog.jp/entry/2019/05/12/131734
      -->
      <img
        class="mx-auto mb-4 h-12"
        :src="genresDict[genre].genreUrl"
        :alt="genresDict[genre].aka"
      />
      <SlideApp :genre="genre" :posts="postIds.map((id) => getPost(id))" />
    </section>
  </article>
</template>

<script>
// import { mapMutations } from 'vuex'

import { genresDict, colorsDict, envsDict } from "~/plugins/define.js";

export default {
  // https://qiita.com/watataku8911/items/8dba8082b35dbbde4533
  // https://nuxtjs.org/docs/directory-structure/store/
  computed: {
    postGenresDict() {
      return this.$store.getters["posts/getPostGenresDict"];
    },
  },
  methods: {
    getPost(id) {
      return this.$store.getters["posts/getPost"](id);
    },
  },
  data() {
    let swiperOptionsDict = {};
    const genres = Object.keys(genresDict);
    genres.forEach(
      (genre) =>
        (swiperOptionsDict[genre] = {
          loop: true,
          pagination: {
            el: `.swiper-pagination-${genre}`,
            clickable: true,
          },
          navigation: {
            nextEl: `.swiper-button-next-${genre}`,
            prevEl: `.swiper-button-prev-${genre}`,
            dynamicBullets: true,
          },
        })
    );
    return {
      // define
      genresDict,
      colorsDict,
      envsDict,
      swiperOptionsDict,
    };
  },
};
</script>
