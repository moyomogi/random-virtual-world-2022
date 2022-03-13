<template>
  <div class="self-bg flex flex-col items-center">
    <!--
      main, article, section は div と同じ役割です。
      全部 div でもいいですが、コードを見やすくするために振り分けています。
      また、ウェブスクレイピングがしやすくなるという利点もあります。
    -->
    <main class="container px-4 mx-auto flex">
      <article
        :class="[
          colorsDict[genresDict[post.genre].color].borderClass,
          colorsDict[genresDict[post.genre].color].shadowClass,
        ]"
        class="
          container
          mx-auto
          my-8
          p-12
          bg-stone-100
          border-4
          rounded-xl
          shadow-md
          md:flex
        "
      >
        <!-- article (left) -->
        <section
          class="w-11/12 md:w-1/2 lg:w-2/3 mb-6 md:mb-0 md:pr-8 space-y-2"
        >
          <div class="flex items-center space-x-3">
            <h1 class="text-gray-800 text-3xl font-medium">
              {{ slug }}
            </h1>
            <span
              :class="[
                colorsDict[genresDict[post.genre].color].textClass,
                colorsDict[genresDict[post.genre].color].bgClass,
              ]"
              class="
                inline-block
                ml-1
                mr-2
                px-2
                py-1
                text-sm
                rounded
                font-semibold
                tracking-wide
              "
              >{{ genresDict[post.genre].aka }}</span
            >
          </div>
          <div class="pt-2 pb-4">
            <p v-for="(line, idx) in post.body.split('\n')" :key="idx">
              {{ line }}
            </p>
          </div>

          <!-- 水平線 (所謂 hr) -->
          <div class="border-t border-stone-200"></div>

          <!-- author -->
          <div class="flex min-h-10 items-center">
            <span class="text-gray-500">作者</span>
            <span class="ml-auto -my-4 text-gray-800 flex flex-wrap">
              <span
                v-for="athr in post.authors"
                :key="athr"
                class="mr-2 flex flex-row items-center"
              >
                <img
                  :src="authorsDict[athr].icon"
                  class="h-8 w-8 rounded-full"
                />
                <p class="mx-1">
                  {{ authorsDict[athr].name }}
                </p>
              </span>
            </span>
          </div>

          <!-- 水平線 (所謂 hr) -->
          <div class="border-t border-stone-200"></div>

          <!-- updatedTime -->
          <div class="flex min-h-8 items-center">
            <span class="text-gray-500">更新日時</span>
            <span class="ml-auto text-gray-800">{{ post.updatedTime }}</span>
          </div>

          <!-- 水平線 (所謂 hr) -->
          <div class="border-t border-stone-200"></div>

          <!-- supportedEnvs -->
          <div class="flex min-h-8 items-center">
            <span class="mr-auto text-gray-500">対応環境</span>
            <span v-for="env in post.supportedEnvs" :key="env">
              <span
                :class="[
                  colorsDict[envsDict[env].color].textClass,
                  colorsDict[envsDict[env].color].bgClass,
                ]"
                class="
                  inline-block
                  ml-2
                  px-2
                  py-1
                  text-xs
                  rounded-full
                  font-semibold
                  tracking-wide
                "
                >{{ envsDict[env].aka }}</span
              >
            </span>
          </div>

          <!-- 水平線 (所謂 hr) -->
          <div class="border-t border-stone-200"></div>

          <!-- downloadUrl, playUrl -->
          <div class="ml-auto pt-3 w-full flex justify-end space-x-4">
            <a
              v-if="post.downloadUrl"
              rel="noopener"
              :href="post.downloadUrl"
              target="_blank"
              :class="colorsDict[genresDict[post.genre].color].buttonClass"
              class="py-2 px-6 text-white focus:outline-none rounded"
            >
              Download
            </a>
            <a
              v-if="post.playUrl"
              rel="noopener"
              :href="post.playUrl"
              target="_blank"
              :class="colorsDict[genresDict[post.genre].color].buttonClass"
              class="py-2 px-6 text-white focus:outline-none rounded"
            >
              Play
            </a>
          </div>
        </section>

        <!-- article (right) -->
        <section
          class="
            relative
            my-auto
            w-11/12
            md:w-1/2
            lg:w-1/3
            rounded-md
            drop-shadow-md
            bg-stone-600
            overflow-hidden
          "
        >
          <!-- 1. swiper (main pic) -->
          <section
            :class="genresDict[post.genre].color"
            class="
              swiper
              md:pl-8
              w-full
              aspect-video
              object-cover object-center
              overflow-hidden
            "
            v-swiper:swiperTop="swiperOptionTop"
          >
            <div class="swiper-wrapper">
              <div
                v-for="(pic, idx) in post.pics"
                :key="pic"
                class="swiper-slide"
              >
                <img
                  class="w-full aspect-video bg-white object-cover"
                  :src="pic"
                  :title="slug"
                  :alt="slug"
                />
                <div
                  class="
                    absolute
                    flex
                    mx-auto
                    inset-x-0
                    bottom-2
                    h-5
                    w-10
                    bg-black bg-opacity-40
                    rounded
                    text-stone-100 text-sm
                  "
                >
                  <p class="m-auto">
                    {{ `${(idx % picsDefaultLen) + 1} / ${picsDefaultLen}` }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- 2. swiper (sub pics) -->
          <div class="p-1">
            <section
              class="swiper object-cover object-center"
              v-swiper:swiperThumbs="swiperOptionThumbs"
            >
              <div class="swiper-wrapper">
                <div
                  v-for="pic in post.pics"
                  :key="pic"
                  class="swiper-slide bg-gray-900 relative"
                >
                  <div
                    id="darken"
                    class="
                      absolute
                      h-full
                      w-full
                      bg-black bg-opacity-50
                      transition-colors
                      ease-in-out
                      duration-300
                    "
                  ></div>
                  <img
                    class="
                      w-full
                      aspect-video
                      bg-white
                      rounded
                      overflow-hidden
                      object-cover
                    "
                    :src="pic"
                    :title="slug"
                    :alt="slug"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </article>
    </main>
    <TheSlides />
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";
import {
  genresDict,
  authorsDict,
  colorsDict,
  envsDict,
} from "~/plugins/define.js";

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  directives: {
    swiper: directive,
  },
  data() {
    return {
      picsDefaultLen: 1,
      // define
      genresDict,
      authorsDict,
      colorsDict,
      envsDict,
      swiperOptionTop: {
        loop: true,
        // loopedSlides: post.pics.length,
        autoplay: {
          delay: 5000,
        },
        // pagination: {
        //   el: ".swiper-pagination",
        //   type: "fraction",
        // },
      },
      swiperOptionThumbs: {
        loop: true,
        // loopedSlides: post.pics.length,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 3,
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },
  // https://qiita.com/watataku8911/items/8dba8082b35dbbde4533
  // https://nuxtjs.org/docs/directory-structure/store/
  computed: {
    post() {
      let post = this.$store.getters["posts/getPostByTitle"](this.slug);
      post = deepCopy(post);
      if (!post) {
        // this.$nuxt.context.res.statusCode = 404;
        this.$nuxt.context.error({
          statusCode: 404,
          message: `記事「${this.slug}」は存在しません。`,
        });
        return {
          body: `記事「${this.slug}」は存在しません。`,
          genre: "puzzle",
          pics: [],
        };
      }
      if (post.pics.length === 0) {
        post.pics = [
          "data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7",
        ];
      }
      // 画像が一枚だと #darken がバグるので 2 枚に複製。
      this.picsDefaultLen = post.pics.length;
      while (post.pics.length <= 2) {
        const pics = post.pics;
        pics.forEach((pic) => post.pics.push(pic));
      }
      this.swiperOptionTop.loopedSlides = post.pics.length;
      this.swiperOptionThumbs.loopedSlides = post.pics.length;
      return post;
    },
  },
  mounted() {
    // https://github.com/surmon-china/vue-awesome-swiper/issues/272#issuecomment-751482139
    this.swiperTop.controller.control = this.swiperThumbs;
    this.swiperThumbs.controller.control = this.swiperTop;
  },
  head() {
    const TITLE = this.slug;
    const DESC = this.post.body;
    if (!TITLE || !DESC) return {};
    return {
      // <title> を設定
      title: TITLE,
      meta: [
        // og の方の title
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: TITLE,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: TITLE,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://vuetest-103b3.herokuapp.com",
        },
        { hid: "og:image", property: "og:image", content: this.post.pics[0] },
        {
          hid: "og:description",
          property: "og:description",
          content: DESC,
        },
        {
          hid: "description",
          name: "description",
          content: DESC,
        },
      ],
    };
  },
  asyncData({ params }) {
    // https://nuxtjs.org/ja/docs/directory-structure/pages/
    // "/abc" パスにアクセスすると、slug は "abc" になります。
    // cf: このプロジェクトにおいては slug == title です
    const { slug } = params;
    return { slug };
  },
};
</script>

<style scoped lang="postcss">
/* https://github.com/surmon-china/vue-awesome-swiper/issues/98 */
.swiper-slide-active >>> #darken,
.swiper-slide-duplicate-active >>> #darken {
  @apply bg-transparent;
}
</style>
