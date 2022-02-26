<template>
  <div>
    <!-- <client-only> はビルド時に消滅 -->
    <client-only>
      <!-- https://github.surmon.me/vue-awesome-swiper/ -->
      <swiper class="swiper" id="slide" :options="swiperOption">
        <div
          class="swiper-pagination swiper-pagination-white"
          slot="pagination"
          id="slide-top"
        ></div>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </swiper>

      <!-- import/export するには module であることが必須 -->
      <!-- <script type="module" src="~/component/firebase.js"></script> -->
    </client-only>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "slideApp",
  title: "Fade effect",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        effect: "fade",
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


<style lang="scss" scoped>
.swiper {
  height: 360px;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: $font-size-huge * 2;
    background-color: $white;
    background-position: center;
    background-size: cover;
    // &.slide-1 {
    //   background-image: url("/images/example/5.jpg");
    // }
    // &.slide-2 {
    //   background-image: url("/images/example/6.jpg");
    // }
    // &.slide-3 {
    //   background-image: url("/images/example/7.jpg");
    // }
    // &.slide-4 {
    //   background-image: url("/images/example/8.jpg");
    // }
    // &.slide-5 {
    //   background-image: url("/images/example/9.jpg");
    // }
  }
}
