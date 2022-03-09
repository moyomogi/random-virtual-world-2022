<template>
  <client-only>
    <article
      :class="colorsDict[genresDict[genre].color].borderClass"
      class="
        swiper
        directive
        aspect-[8/9]
        bg-stone-100
        border-2
        rounded-xl
        drop-shadow-lg
        overflow-hidden
      "
      v-swiper="swiperOption"
    >
      <div class="swiper-wrapper">
        <div v-for="post in posts" :key="post.title" class="swiper-slide">
          <img
            class="w-full aspect-video bg-white object-cover drop-shadow"
            :src="post.pics[0]"
            :title="post.title"
            :alt="post.title"
          />
          <div class="px-6 pt-6 mb-auto">
            <div class="items-baseline">
              <NuxtLink :to="`/posts/${post.title}`">
                <h1
                  class="
                    mb-2
                    font-semibold
                    text-lg text-stone-800
                    hover:underline hover:decoration-stone-800
                  "
                >
                  {{ post.title }}
                </h1></NuxtLink
              >
              <div class="space-x-2 mb-2 inline-block">
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
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
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

<style scoped>
/* https://github.com/surmon-china/vue-awesome-swiper/issues/98 */
.swiper-pagination > .swiper-pagination-bullet {
    opacity: 1;
    border: black solid 1px;
    background-color: transparent;
}
.swiper-pagination > .swiper-pagination-bullet-active {
    background-color: black;
}
</style>
