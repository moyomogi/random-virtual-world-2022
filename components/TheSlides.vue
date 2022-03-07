<template>
  <!-- swiper template https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/Test.vue -->
  <!-- fixed aspect ratio https://tailwindcss.jp/course/locking-images-to-a-fixed-aspect-ratio -->
  <article class="container px-2 pt-3 mb-8 mx-auto flex flex-wrap">
    <!-- <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p> -->
    <section
      v-for="(posts, genre) in postsList"
      :key="genre"
      class="
        container
        mx-auto
        md:px-6
        pt-6
        pb-1
        w-11/12
        md:w-1/2
        lg:w-1/3
        xl:w-1/4
        overflow-hidden
      "
    >
      <!-- a の href で id に飛ばす用の虚無 -->
      <div :id="genre" class="-translate-y-24"></div>
      <!-- assets に置いた画像は require する必要がある
        https://omiend.hatenablog.jp/entry/2019/05/12/131734
      -->
      <img
        class="mx-auto mb-4 h-12"
        :src="genresDict[genre].genreUrl"
        :alt="genresDict[genre].aka"
      />
      <SlideApp :genre="genre" :posts="posts" />
    </section>
  </article>
</template>

<script>
// https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
import { db } from "~/plugins/firebase.js";
import { getDocs, collection } from "firebase/firestore";

import { genresDict, colorsDict, envsDict } from "~/plugins/define.js";

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
  // https://nuxtjs.org/ja/docs/components-glossary/fetch/
  // fetch はサーバーサイドではルートをレンダリングするときに、クライアントサイドでは遷移するときに呼び出されます。
  async fetch() {
    // https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
    // firebase公式 https://firebase.google.com/docs/firestore/query-data/queries
    // firestore/posts/ の参照を取得
    const postsRef = collection(db, "posts");
    // const q = query(postsRef);
    try {
      // firestore/posts/<accessToken> を全件列挙
      const documents = await getDocs(postsRef);
      if (!documents) {
        console.warn("(TheSlides, fetch) Invalid documents");
        return;
      }
      const genres = Object.keys(genresDict);
      genres.forEach((genre) => (this.postsList[genre] = []));
      // .forEash() は直に付けれるが、
      // .map() は .docs.map() にしないといけない。
      documents.forEach((document) => {
        // cf: document.id == accessToken
        // console.log("(TheSlides) document.id");
        // console.log(document.id);
        let post = document.data();
        if (!post || !document.exists()) {
          console.warn("(TheSlides, fetch) Invalid post");
          return;
        }
        console.log(`(TheSlides) Sync'd ${post.title}`);
        this.postsList[post.genre].push(post);
      });
    } catch (e) {
      console.warn("(TheSlides, fetch) Error");
      console.warn(e);
    }
  },
  data() {
    let postsList = {};
    let swiperOptionsDict = {};
    const genres = Object.keys(genresDict);
    genres.forEach((genre) => (postsList[genre] = []));
    genres.forEach(
      (genre) =>
        (swiperOptionsDict[genre] = {
          loop: true,
          pagination: {
            el: `.swiper-pagination-${genre}`,
            clickable: true,
          },
          navigation: {
            nextEl: `.swiper-button-next-${genre}`,
            prevEl: `.swiper-button-prev-${genre}`,
            dynamicBullets: true,
          },
        })
    );
    return {
      // fetch
      postsList,
      // define
      genresDict,
      colorsDict,
      envsDict,
      // swiperOption: {
      //   loop: true,
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true,
      //   },
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //       dynamicBullets: true,
      //   },
      // },
      swiperOptionsDict,
    };
  },
  // methods: {
  // https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
  // async readFromFirestore() {
  //   // const collectionRef = collection(db, "testCollection");
  //   const docRef = doc(db, "testCollection", "testDoc");
  //   try {
  //     const document = await getDoc(docRef);
  //     alert(document.data().text);
  //   } catch (e) {
  //     alert("Error!");
  //     console.error(e);
  //   }
  // },
  // },
};
</script>
