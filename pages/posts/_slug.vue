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
        overflow-hidden
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

const defaultPost = {
  // accessToken: "",
  body: "",
  url: "https://vuetest-103b3.web.app",
  genre: "puzzle",
  supportedEnvs: [],
  authors: [],
  // 1x1 の最小 GIF https://qiita.com/CloudRemix/items/92e68a048a0da93ed240
  pics: [
    "data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7",
  ],
  updatedTime: "2022/03/07 0:0",
};
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
      // post: defaultPost,  // asyncData の post を上書きしてしまう
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
    return {
      title: this.slug,
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
    let accessToken = "";
    const redirectsDocRef = doc(db, "redirects", slug);
    try {
      const redirectDocument = await getDoc(redirectsDocRef);
      if (!redirectDocument) {
        console.log("(_slug, asyncData, redirects) Invalid doc ref");
        error({
          statusCode: 404,
          message: `記事「${slug}」は存在しません。`,
        });
        return { post: defaultPost, slug };
      }
      const data = redirectDocument.data();
      if (!data) {
        console.log("(_slug, asyncData, redirects) Invalid doc ref");
        error({
          statusCode: 404,
          message: `記事「${slug}」は存在しません。`,
        });
        return { post: defaultPost, slug };
      }
      accessToken = data.redirect;
    } catch (e) {
      console.warn("(_slug, asyncData, redirects) Error");
      console.warn(e);
      error({
        statusCode: 500,
        message: `記事「${slug}」の取得に失敗しました。`,
      });
    }
    // firestore/posts/<accessToken>/ に json を送信
    let post = defaultPost;
    const postsDocRef = doc(db, "posts", accessToken);
    try {
      const postsDocument = await getDoc(postsDocRef);
      if (!postsDocument) {
        console.log("(_slug, asyncData, posts) Invalid doc ref");
        error({
          statusCode: 404,
          message: `記事「${slug}」のデータが壊れています。`,
        });
        return { post: defaultPost, slug };
      }
      post = postsDocument.data();
      if (!post) {
        console.warn("(_slug, asyncData, posts) Invalid");
        error({
          statusCode: 500,
          message: `記事「${slug}」のデータが壊れています。`,
        });
        return { post: defaultPost, slug };
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
