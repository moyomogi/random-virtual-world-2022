<template>
  <div class="w-full bg-slate-500">
    <article
      class="
        swiper
        directive
        mx-auto
        sm:w-1/2
        md:w-1/3
        lg:w-1/4
        xl:w-1/6
        aspect-[540/756]
        shadow-lg
        overflow-hidden
      "
      v-swiper="swiperOption"
    >
      <!-- この中に各スライドを入れる -->
      <div class="swiper-wrapper">
        <div v-for="(img, idx) in imgs" :key="idx" class="swiper-slide">
          <img
            class="bg-white object-cover drop-shadow"
            :src="img"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";

export default {
  directives: {
    swiper: directive,
  },
  data() {
    return {
      // Fade Effect
      swiperOption: {
        effect: "fade",
        loop: true,
        speed: 700,
        autoplay: {
          delay: 9000,
        },
      },
      imgs: ["/concept_art_1.webp", "/concept_art_2.webp"],
    };
  },
};
</script>
