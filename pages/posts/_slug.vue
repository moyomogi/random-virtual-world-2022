<template>
  <div class="self-bg flex flex-col">
    <!--
      main, article, section は div と同じ役割です。
      全部 div でもいいですが、コードを見やすくするために振り分けていま
      す。
      また、ウェブスクレイピングがしやすくなるという利点もあります。
    -->
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
        overflow-hidden
      "
    >
      <article class="md:flex">
        <!-- article (left) -->
        <section class="md:w-2/3 mb-6 md:mb-0 md:pr-8 space-y-2">
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
                text-xs
                rounded-full
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
        <!-- <client-only> -->
        <section
          class="
            swiper
            my-auto
            md:pl-8 md:w-1/3
            aspect-video
            object-cover object-center
            rounded
            drop-shadow
            overflow-hidden
          "
          v-swiper="swiperOption"
        >
          <div class="swiper-wrapper">
            <div v-for="pic in post.pics" :key="pic" class="swiper-slide">
              <img
                class="w-full aspect-video bg-white object-cover"
                :src="pic"
                :title="slug"
                :alt="slug"
              />
            </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </section>
        <!-- </client-only> -->
      </article>
    </main>
    <TheSlides />
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/plugins/firebase.js";

import { directive } from "vue-awesome-swiper";
import {
  genresDict,
  authorsDict,
  colorsDict,
  envsDict,
} from "~/plugins/define.js";

export default {
  // https://github.com/nuxt-community/firebase-module/issues/90
  // NuxtJS + Firestore 特有のバグ
  hooks: {
    generate: {
      done(builder) {
        db.goOffline();
      },
    },
  },
  transition: "expandFade",
  directives: {
    swiper: directive,
  },
  data() {
    return {
      // asyncData
      // post: {},  // asyncData の post を上書きしてしまう
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
          dynamicBullets: true,
        },
      },
    };
  },
  head() {
    const DESC = this.post.body;
    return {
      title: this.slug,
      meta: [
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
  // async https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
  // async 関数では、返値が暗黙的に `Promise.resolve(/* value */)` でラップされる
  // https://qiita.com/sotszk/items/f23199e864cba47455ce
  // `Promise.resolve(/* value */)` は以下と等価
  // `new Promise(resolve => resolve(/* value */))`
  // https://negalog.com/nuxt-js-fetch-data/
  // asyncData() がサーバー側で実行されるのは、アプリケーションへの初回アクセス時のみ。
  // (URL への直接アクセス・リロードなどの形でページに遷移した場合など)
  // 最初の一回はサーバー側で実行されるが、以降は SPA として動作。
  // (ブラウザ側で実行される)
  async asyncData({ params, error }) {
    // https://nuxtjs.org/ja/docs/directory-structure/pages/
    // "/abc" パスにアクセスすると、slug は "abc" になります。
    // cf: このプロジェクトにおいては slug == title です
    const { slug } = params;
    // firestore/redirects/<title>/ にある json を取得
    let postId = "";
    const redirectsDocRef = doc(db, "redirects", slug);
    try {
      const redirectDocument = await getDoc(redirectsDocRef);
      if (!redirectDocument) {
        console.log("(_slug, asyncData, redirects) Invalid doc ref");
        error({
          statusCode: 404,
          message: `記事「${slug}」は存在しません。`,
        });
      }
      const data = redirectDocument.data();
      if (!data) {
        console.log("(_slug, asyncData, redirects) Invalid doc ref");
        error({
          statusCode: 404,
          message: `記事「${slug}」は存在しません。`,
        });
      }
      postId = data.redirect;
    } catch (e) {
      console.warn("(_slug, asyncData, redirects) Error");
      console.warn(e);
      error({
        statusCode: 500,
        message: `記事「${slug}」の取得に失敗しました。`,
      });
    }
    // firestore/posts/<postId>/ に json を送信
    let post = {};
    const postsDocRef = doc(db, "posts", postId);
    try {
      const postsDocument = await getDoc(postsDocRef);
      if (!postsDocument) {
        console.log("(_slug, asyncData, posts) Invalid doc ref");
        error({
          statusCode: 404,
          message: `記事「${slug}」のデータが壊れています。`,
        });
      }
      post = postsDocument.data();
      if (!post) {
        console.warn("(_slug, asyncData, posts) Invalid");
        error({
          statusCode: 500,
          message: `記事「${slug}」のデータが壊れています。`,
        });
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
    return { post, slug };
  },
};
</script>
