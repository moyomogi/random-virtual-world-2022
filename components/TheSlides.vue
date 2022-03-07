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
      <div :id="genre.toLowerCase()" class="-translate-y-24"></div>
      <!-- assets に置いた画像は require する必要がある
        https://omiend.hatenablog.jp/entry/2019/05/12/131734
      -->
      <img
        class="mx-auto mb-4 h-12"
        :src="genresDict[genre].genreUrl"
        :alt="genresDict[genre].aka"
      />
      <client-only>
        <swiper
          :class="colorsDict[genresDict[genre].color].borderClass"
          class="
            aspect-[8/9]
            bg-stone-100
            border-2
            rounded-xl
            drop-shadow-lg
            overflow-hidden
          "
          :options="swiperOption"
        >
          <swiper-slide
            v-for="post in posts"
            :key="post.title"
            class="relative"
          >
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
                      tracking-wide
                    "
                    >{{ envsDict[env].aka }}</span
                  >
                </div>
              </div>
              <!-- truncate は不要？ -->
              <p class="mb-16 break-all">
                {{ post.body }}
              </p>
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
// https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
import { db } from "~/plugins/firebase.js";
import { getDocs, collection } from "firebase/firestore";

import { genresDict, colorsDict, envsDict } from "~/plugins/define.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// fetch を使おうね https://nuxtjs.org/docs/features/data-fetching#async-data-in-components
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async fetch() {
    // https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
    // firebase公式 https://firebase.google.com/docs/firestore/query-data/queries
    // firestore/posts/ の参照を取得
    const postsRef = collection(db, "posts");
    // const q = query(postsRef);
    try {
      // firestore/posts/<accessToken> を全件列挙
      const documents = await getDocs(postsRef);
      documents.forEach((document) => {
        // cf: document.id == accessToken
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
    const genres = Object.keys(genresDict);
    genres.forEach((genre) => (postsList[genre] = []));
    return {
      // fetch
      postsList,
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
