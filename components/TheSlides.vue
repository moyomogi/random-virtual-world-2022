<template>
  <!-- swiper template https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/Test.vue -->
  <!-- fixed aspect ratio https://tailwindcss.jp/course/locking-images-to-a-fixed-aspect-ratio -->
  <article class="container px-2 py-3 mx-auto flex flex-wrap">
    <section
      v-for="(slides, genre) in slidesList"
      :key="genre"
      class="mx-auto md:px-6 py-6 h-full w-11/12 md:w-1/2 lg:w-1/3"
    >
      <!-- a の href で id に飛ばす用の虚無 -->
      <div :id="genre.toLowerCase()" class="-translate-y-24"></div>
      <!-- static に置いた画像は require する必要がある
          https://omiend.hatenablog.jp/entry/2019/05/12/131734 -->
      <img
        class="mx-auto mb-4 h-12 w-auto"
        :src="genresDict[genre].genreUrl"
        :title="genre"
        :alt="genre"
      />
      <client-only>
        <swiper
          :class="colorsDict[genresDict[genre].color].borderClass"
          class="
            h-full
            bg-white
            border-2 bg-clip-padding
            rounded-xl
            overflow-hidden
          "
          :options="swiperOption"
        >
          <swiper-slide v-for="slide in slides" :key="slide.title">
            <img
              class="w-full aspect-16/9 object-cover"
              :src="slide.tmbUrl"
              :title="slide.title"
              :alt="slide.title"
            />
            <div class="p-6">
              <div class="items-baseline">
                <div
                  class="mb-2 rounded-full font-semibold text-lg inline-block"
                >
                  {{ slide.title }}
                  <span
                    :class="[
                      colorsDict[genresDict[genre].color].textClass,
                      colorsDict[genresDict[genre].color].bgClass,
                    ]"
                    class="
                      inline-block
                      ml-1
                      p-2
                      text-xs
                      rounded-full
                      font-semibold
                      tracking-wide
                    "
                    >{{ slide.devName }}</span
                  >
                </div>
              </div>
              <div class="mb-3">
                <span v-html="slide.caption"></span>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </client-only>
    </section>
  </article>
</template>


<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  // Vue インスタンス生成前なので、
  // `$` から始まる変数は引数 context から参照できます
  data({ $genresDict, $getSlides }) {
    // Usage:
    // :class="[colorsDict[genresDict[genre].color].colorClass]"
    const colorsDict = {
      cyan: {
        textClass: "text-sky-800",
        bgClass: "bg-sky-200",
        borderClass: "border-sky-400",
        buttonUrls: ["/slides/button_c.png", "/slides/button_c_hover.png"],
        frameUrl: "/slides/frame_c.png",
      },
      magenta: {
        textClass: "text-pink-800",
        bgClass: "bg-pink-200",
        borderClass: "border-pink-400",
        buttonUrls: ["/slides/button_m.png", "/slides/button_m_hover.png"],
        frameUrl: "/slides/frame_m.png",
      },
      yellow: {
        textClass: "text-yellow-800",
        bgClass: "bg-yellow-200",
        borderClass: "border-yellow-400",
        buttonUrls: ["/slides/button_y.png", "/slides/button_y_hover.png"],
        frameUrl: "/slides/frame_y.png",
      },
    };
    let slidesList = {};
    if (process.client) {
      const genres = Object.keys($genresDict);

      // 事前に dict がもつべき keys を伝える
      genres.forEach((genre) => (slidesList[genre] = []));

      genres.forEach(async (genre) => {
        slidesList[genre] = await $getSlides(genre);
      });
    }
    // 謎バグ
    // if ($slides) {
    //   console.log("$slides !== null");
    //   console.log($slides);
    //   // 事前に dict がもつべき keys を伝える
    //   Object.keys(slidesList).forEach((genre) => (slidesList[genre] = []));
    //   $slides.forEach((slide) => slidesList[slide.genre].push(slide));
    //   console.log("slidesList");
    //   console.log(slidesList);
    // }

    return {
      genresDict: $genresDict,
      colorsDict,
      slidesList,
      swiperOption: {
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
    };
  },
};
</script>
