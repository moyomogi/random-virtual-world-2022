<template>
  <client-only>
    <article
      :class="[
        genresDict[genre].color,
        colorsDict[genresDict[genre].color].borderClass,
        colorsDict[genresDict[genre].color].shadowClass,
      ]"
      class="
        swiper
        directive
        aspect-[8/9]
        bg-stone-100
        border-2
        rounded-xl
        shadow-lg
        overflow-hidden
      "
      v-swiper="swiperOption"
    >
      <!-- この中に各スライドを入れる -->
      <div class="swiper-wrapper">
        <div v-for="post in posts" :key="post.title" class="swiper-slide">
          <img
            class="w-full aspect-video bg-white object-cover drop-shadow"
            :src="post.pics[0]"
            :alt="post.title"
          />
          <div class="px-6 pt-4 mb-auto">
            <div class="items-baseline">
              <NuxtLink :to="`/posts/${post.title}`">
                <h1
                  class="
                    pr-1
                    inline-block
                    text-2xl
                    md:text-xl
                    font-medium
                    text-lg text-stone-800
                    hover:underline hover:decoration-stone-800
                  "
                >
                  {{ post.title }}
                </h1></NuxtLink
              >
              <div class="space-x-2 p-1 inline-block">
                <span
                  v-for="env in post.supportedEnvs"
                  :key="env"
                  :class="[
                    colorsDict[envsDict[env].color].textClass,
                    colorsDict[envsDict[env].color].bgClass,
                  ]"
                  class="
                    inline-block
                    px-2
                    py-1
                    text-xs
                    rounded-full
                    font-semibold
                  "
                  >{{ envsDict[env].aka }}</span
                >
              </div>
            </div>
            <p class="mb-16 break-all">
              {{ post.body }}
            </p>
          </div>
        </div>
      </div>

      <!-- swiper 諸要素 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div
        :class="{ invisible: posts.length <= 1 }"
        class="swiper-button-prev"
        slot="button-prev"
      ></div>
      <div
        :class="{ invisible: posts.length <= 1 }"
        class="swiper-button-next"
        slot="button-next"
      ></div>
    </article>
  </client-only>
</template>

<script>
import { directive } from "vue-awesome-swiper";
import { genresDict, colorsDict, envsDict } from "~/plugins/define.js";

export default {
  // slot は String しか渡せない。String 以外は props。
  props: {
    genre: {
      type: String,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
  directives: {
    swiper: directive,
  },
  mounted() {
    if (this.posts.length <= 1) {
      this.swiperOption.slideToClickedSlide = true;
      this.swiperOption.loop = false;
    }
  },
  data() {
    return {
      // define
      genresDict,
      colorsDict,
      envsDict,
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

<style scoped lang="postcss">
/* https://github.com/surmon-china/vue-awesome-swiper/issues/98 */
.magenta >>> .swiper-pagination-bullet {
  @apply bg-pink-400 opacity-40;
}
.cyan >>> .swiper-pagination-bullet {
  @apply bg-sky-400 opacity-40;
}
.yellow >>> .swiper-pagination-bullet {
  @apply bg-yellow-400 opacity-40;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  @apply opacity-100;
}
.magenta >>> .swiper-button-prev,
.magenta >>> .swiper-button-next {
  @apply text-pink-400 drop-shadow;
}
.cyan >>> .swiper-button-prev,
.cyan >>> .swiper-button-next {
  @apply text-sky-400 drop-shadow;
}
.yellow >>> .swiper-button-prev,
.yellow >>> .swiper-button-next {
  @apply text-yellow-400 drop-shadow;
}
</style>
