<template>
  <div class="self-bg flex flex-col">
    <main
      :class="colorsDict[genresDict[post.genre].color].borderClass"
      class="
        container
        mx-4
        md:mx-auto
        my-8
        p-12
        bg-stone-100
        border-4
        rounded-xl
        drop-shadow-lg
      "
    >
      <article class="md:flex">
        <!-- article (left) -->
        <section class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h1 class="text-gray-900 text-3xl font-medium mb-4">
            {{ slug }}
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
                text-xs
                rounded-full
                font-semibold
                tracking-wide
              "
              >{{ genresDict[post.genre].aka }}</span
            >
          </h1>
          <div class="mb-4">
            <p v-for="(line, idx) in post.body.split('\n')" :key="idx">
              {{ line }}
            </p>
          </div>
          <div class="flex border-t border-gray-200 py-2">
            <span class="text-gray-500">作者</span>
            <span class="ml-auto text-gray-900">
              {{
                post.authors.map((athr) => authorsDict[athr].name).join(", ")
              }}
            </span>
          </div>
          <div class="flex border-t border-gray-200 py-2">
            <span class="text-gray-500">更新日時</span>
            <span class="ml-auto text-gray-900">{{ post.updatedTime }}</span>
          </div>
          <div class="flex border-t border-gray-200 py-2">
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
          <div class="mt-4 w-full flex items-center">
            <a
              rel="noopener"
              :href="post.url"
              target="_blank"
              :class="colorsDict[genresDict[post.genre].color].buttonClass"
              class="ml-auto py-2 px-6 text-white focus:outline-none rounded"
            >
              Download
            </a>
          </div>
        </section>

        <!-- article (right) -->
        <client-only>
          <swiper
            class="
              my-auto
              md:pl-8 md:w-1/3
              aspect-video
              object-cover object-center
              rounded
              drop-shadow
            "
            :options="swiperOption"
          >
            <swiper-slide v-for="pic in post.pics" :key="pic">
              <img
                class="w-full aspect-video bg-white object-cover"
                :src="pic"
                :title="slug"
                :alt="slug"
              />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </client-only>
      </article>
    </main>
    <TheSlides />
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { doc, getDoc } from "firebase/firestore";

import {
  genresDict,
  authorsDict,
  colorsDict,
  envsDict,
} from "~/plugins/define.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // asyncData
      post: null,
      // define
      genresDict,
      authorsDict,
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
  head() {
    return {
      title: this.slug,
    };
  },
  // async fetch() {
  //   const ref = doc(db, "posts", this.slug);
  //   try {
  //     const document = await getDoc(ref);
  //     alert(document.data().text);
  //   } catch (e) {
  //     alert("(_slug, fetch) Error");
  //     console.error(e);
  //   }
  // },
  async asyncData({ params, error }) {
    // https://nuxtjs.org/ja/docs/directory-structure/pages/
    // "/abc" パスにアクセスすると、slug は "abc" になります。
    // cf: このプロジェクトにおいては slug == title です
    const { slug } = params;
    // firestore/redirects/<title>/ にある json を取得
    let accessToken = "";
    {
      const docRef = doc(db, "redirects", slug);
      try {
        const document = await getDoc(docRef);
        if (!document.exists() || !document.data()) {
          console.log("(_slug, asyncData, redirects) Invalid doc ref");
          error({
            statusCode: 404,
            message: `記事「${slug}」は存在しません。`,
          });
          return;
        }
        accessToken = document.data().redirect;
        if (!accessToken) {
          console.warn("(_slug, asyncData, redirects) Invalid");
          error({
            statusCode: 500,
            message: `記事「${slug}」のデータが壊れています。`,
          });
          return;
        }
      } catch (e) {
        console.warn("(_slug, asyncData, redirects) Error");
        console.warn(e);
        error({
          statusCode: 500,
          message: `記事「${slug}」の取得に失敗しました。`,
        });
      }
    }
    // firestore/posts/<accessToken>/ に json を送信
    let post = null;
    {
      // console.log("(dbg) accessToken");
      // console.log(accessToken);
      const docRef = doc(db, "posts", accessToken);
      try {
        const document = await getDoc(docRef);
        post = document.data();
        if (!post) {
          console.warn("(_slug, asyncData, posts) Invalid");
          error({
            statusCode: 500,
            message: `記事「${slug}」のデータが壊れています。`,
          });
          return;
        }
        console.log(`(_slug, asyncData, posts) Sync'd ${slug}`);
      } catch (e) {
        console.log("(_slug, asyncData, posts) Error");
        console.log(e);
        error({
          statusCode: 404,
          message: `記事「${slug}」は削除されました。`,
        });
      }
    }
    return { post, slug };
  },
};
</script>
