<template>
  <client-only>
    <!-- swiper github https://github.surmon.me/vue-awesome-swiper/ -->
    <!-- swiper template https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/Test.vue -->
    <!-- fixed aspect ratio https://tailwindcss.jp/course/locking-images-to-a-fixed-aspect-ratio -->
    <!-- <div class="justify-center"> -->
    <swiper
      class="bg-white border rounded-lg overflow-hidden md:w-1/4"
      :options="swiperOption"
    >
      <swiper-slide v-for="slide in slides" :key="slide.title">
        <!-- <div class="relative pd-[9/16] bg-red">
          <img
            class="absolute w-full h-full object-cover"
            :src="slide.tmbUrl"
            :alt="slide.title"
          />
        </div> -->
        <img class="w-full aspect-16/9 object-cover" :src="slide.tmbUrl" />
        <div class="p-6">
          <div class="md:flex items-baseline">
            <h4 class="mt-1 pr-4 font-semibold text-lg leading-tight truncate">
              {{ slide.title }}
            </h4>
            <span
              :class="[colorDict[slide.genre]]"
              class="
                inline-block
                p-2
                text-xs
                rounded-full
                font-semibold
                tracking-wide
              "
              >{{ slide.genre }}</span
            >
          </div>
          <div class="mt-1">
            <span v-html="slide.caption"></span>
          </div>
        </div>
      </swiper-slide>
      <div id="slide-top" class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- 二重 for 文
          <swiper
          v-for="(slides, genre) in slidesDict"
          :key="genre"
          class="swiper p-10 aspect-[4/3] md:w-1/3 bg-red rounded-lg"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="slide in slides"
            :key="slide.title"
            class=""
            :style="{ backgroundImage: 'url(' + slide.tmbUrl + ')' }"
          >
            <h1 class="title-font text-lg text-red object-cover object-center">
              {{ slide.title }}
            </h1>
            <div class="leading-relaxed mb-3">
              <span v-html="slide.caption"></span>
            </div>
          </swiper-slide>
          <div id="slide-top" class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper> -->
    <!-- </div> -->
  </client-only>
</template>


<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  // https://nuxtjs.org/docs/features/data-fetching/
  // `asyncData()` は page componet でしか使えない一方で、
  // `fetch()` は app componet でも使える
  // https://qiita.com/ono-ta/items/9f2fc82882d367da220e
  // injectを使用する利点: いちいち page で import しなくていい
  // https://zenn.dev/onota/articles/e8e405271653cac3afd7
  // `fetch()` は取得したデータをVuexのstoreに格納して使用
  // Nuxt2.12.0 の `fetch()` https://qiita.com/miyaoka/items/11fdc03ff591d34a585c
  fetchOnServer: true,
  data({ app, $slides }) {
    const slides = $slides;
    console.log("slides");

    // let slidesDict = {
    //   ACTION: [
    //     {
    //       caption:
    //         "いつもの。<br>今回は記憶のないチキンががんばる。<br><br>正直すまんかった。",
    //       genre: "RPG",
    //       title: "CHICKEN NIGHTS",
    //       tmbUrl:
    //         "https://firebasestorage.googleapis.com/v0/b/vuetest-103b3.appspot.com/o/%E3%83%9E%E3%83%AB%E3%82%AF%E3%82%B9%2F%E3%83%9E%E3%83%AB%E3%82%AF%E3%82%B9_thumbnail?alt=media&token=1f75eaaf-34f4-4913-a8b8-a3e49a30b9a9",
    //     },
    //   ],
    //   SHOOTING: [
    //     {
    //       caption:
    //         "いつもの。<br>今回は記憶のないチキンががんばる。<br><br>正直すまんかった。",
    //       genre: "RPG",
    //       title: "CHICKEN NIGHTS",
    //       tmbUrl:
    //         "https://firebasestorage.googleapis.com/v0/b/vuetest-103b3.appspot.com/o/%E3%83%9E%E3%83%AB%E3%82%AF%E3%82%B9%2F%E3%83%9E%E3%83%AB%E3%82%AF%E3%82%B9_thumbnail?alt=media&token=1f75eaaf-34f4-4913-a8b8-a3e49a30b9a9",
    //     },
    //   ],
    // };

    // slides -> slidesDict (genre ごとに分類)
    // let slidesDict = {};
    if (slides) {
      console.log("$slides !== null");
      console.log(slides);
      // JSON.parse(String($slides)).forEach((slide) => {
      //   console.log("slide");
      //   console.log(slide);
      //   const gnr = slide.genre;
      //   console.log("slide.genre");
      //   console.log(gnr);
      //   if (!slidesDict[gnr]) {
      //     console.log("New genre:");
      //     console.log(gnr);
      //     slidesDict[gnr] = [];
      //   }
      //   slidesDict[gnr].push(slide);
      // });
    }

    return {
      slides,
      swiperOption: {
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      colorDict: {
        ACTION: ["bg-orange-200", "text-orange-800"],
        SHOOTING: ["bg-blue-200", "text-blue-800"],
        RPG: ["bg-green-200", "text-green-800"],
        ETCETRA: ["bg-gray-200", "text-gray-800"],
        RHYTHM: ["bg-teal-200", "text-teal-800"],
        SPORTS: ["bg-yellow-200", "text-yellow-800"],
      },
    };
  },
  // async fetch({ app }) {
  //   const slides = await this.$slides;
  //   // const slides = await app.$slides;
  //   // const slides = {};
  //   console.log("slides");
  //   console.log(slides);

  //   // $slides -> this.slidesDict (genre ごとに分類)
  //   for (let slide in slides) {
  //     console.log("slide.genre");
  //     console.log(slide.genre);
  //     if (!this.slidesDict[slide.genre]) {
  //       console.log("New genre:");
  //       console.log(slide.genre);
  //       this.slidesDict[slide.genre] = [];
  //     }
  //     this.slidesDict[slide.genre].push(slide);
  //     console.log("slidesDict[slide.genre]");
  //     console.log(slidesDict[slide.genre]);
  //   }

  //   console.log("this.slidesDict['RPG']");
  //   console.log(this.slidesDict["RPG"]);
  // },
  // methods: {
  //   refresh() {
  //     this.$fetch();
  //   },
  // },
};
</script>
