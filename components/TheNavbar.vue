<template>
  <!-- https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l -->
  <div>
    <nav
      class="
        self-logo
        flex
        fixed
        w-full
        items-center
        justify-between
        px-2
        h-16
        bg-slate-900
        text-white-700
        border-b border-stone-400
        z-10
        bg-contain bg-no-repeat bg-center
      "
    >
      <!-- header (left) -->
      <div class="flex items-center">
        <button
          class="mx-2 focus:outline-none"
          aria-label="Open menu"
          @click="drawerOpen = true"
        >
          <img class="w-12 h-12" src="~assets/navbar/icon_burger.webp" />
        </button>
        <button
          class="mx-2 hidden sm:flex focus:outline-none"
          @click="toggleMuted"
        >
          <img
            v-if="muted"
            class="w-12 h-12"
            src="~assets/navbar/icon_vol_muted.webp"
          />
          <img v-else class="w-12 h-12" src="~assets/navbar/icon_vol.webp" />
        </button>
      </div>

      <!-- header (center) -->
      <div class="flex my-auto">
        <!-- logo には to="/" -->
        <NuxtLink to="/" class="-ml-14 md:ml-24 h-14 w-40"></NuxtLink>
      </div>

      <!-- header (right) -->
      <div class="flex my-auto items-center">
        <!-- info -->
        <button class="mx-3 focus:outline-none" @click="infoOpen = true">
          <img class="w-12 h-12" src="~assets/navbar/icon_info.webp" />
        </button>
        <ModalApp :open="infoOpen" @close="close" />

        <!-- form -->
        <a
          class="mx-3 sm:flex focus:outline-none"
          rel="noopener"
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLScBPL4HLrjunGhR91rCrb0rjuZONT0AtpsQw6r5b8wZH7tN9w/viewform"
        >
          <img class="w-10 h-10" src="~assets/navbar/icon_form.webp" />
        </a>

        <!-- Home Page -->
        <!-- "hidden md:flex": スマホの時は非表示 -->
        <a
          rel="noopener"
          target="_blank"
          href="https://ch-random.net"
          title="Computer House Random"
          :class="colorsDict['random'].buttonClass"
          class="
            mx-2
            p-3
            items-center
            font-medium
            text-center
            rounded
            text-stone-100
            focus:outline-none
            hidden
            md:flex
          "
        >
          <img class="mr-3 h-6 w-6" src="~assets/navbar/icon_hp.webp" />
          <p class="font-bold">Home Page</p></a
        >
      </div>

      <!-- Darken the window -->
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          @keydown.esc="close"
          v-show="drawerOpen || infoOpen"
          class="z-10 fixed inset-0 transition-opacity"
        >
          <div
            @click="close"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
          ></div>
        </div>
      </transition>

      <!-- sidebar -->
      <aside
        class="
          transform
          top-0
          left-0
          fixed
          w-64
          h-full
          z-30
          text-stone-100
          bg-slate-900
          border-r border-stone-400
          overflow-auto
          ease-in-out
          transition-all
          duration-300
          flex flex-col
          justify-between
        "
        :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <!-- sidebar (top, burger) -->
        <div class="absolute top-2 left-2 flex items-center">
          <button
            class="mx-2 focus:outline-none"
            aria-label="Open menu"
            @click="drawerOpen = false"
          >
            <img class="w-12 h-12" src="~assets/navbar/icon_burger.webp" />
          </button>
        </div>

        <!-- sidebar (top, burger 用のスペース) -->
        <div class="mt-10 w-full flex"></div>

        <!-- sidebar (center) -->
        <a
          v-for="(genreConfig, genre) in genresDict"
          :href="'#' + genre.toLowerCase()"
          :key="genre"
          @click="close"
          class="w-full flex items-center"
        >
          <img :src="genreConfig.genreUrl" class="mx-auto h-8" />
        </a>

        <!-- sidebar (Share, Home Page 用のスペース) -->
        <div class="mt-36 w-full flex"></div>

        <!-- sidebar (Share, Home Page) -->
        <div class="fixed bottom-0 w-full">
          <!-- sidebar (Share) -->
          <a
            rel="noopener"
            target="_blank"
            :class="colorsDict['cyan'].buttonClass"
            class="flex items-center p-4 h-16 w-full"
            href="https://twitter.com/intent/tweet?text=RVW%202022%20Spring&url=https://rvw2022s.herokuapp.com&via=c_h_random"
          >
            <svg
              class="h-8 w-auto mr-2"
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
              ></path></svg
            >Share
          </a>

          <!-- sidebar (Home Page) -->
          <a
            rel="noopener"
            target="_blank"
            :class="colorsDict['random'].buttonClass"
            class="flex items-center px-4 h-20 focus:outline-none"
            href="https://ch-random.net"
          >
            <img class="h-8 w-auto mr-2" src="~assets/navbar/icon_hp.webp" />
            <div>
              <span class="font-bold">Home Page</span>
              <br />
              <span class="text-sm mr-3">Computer House Random</span>
            </div>
          </a>
        </div>
      </aside>
    </nav>
    <div class="h-16"></div>
  </div>
</template>

<script>
import { genresDict, colorsDict } from "~/plugins/define.js";

export default {
  // audio https://aqua-engineer.com/post-884/
  data() {
    return {
      genresDict,
      colorsDict,
      drawerOpen: false,
      infoOpen: false,
      audio: process.client ? new Audio("/bgm.mp3") : null,
      muted: true,
    };
  },
  methods: {
    close() {
      this.drawerOpen = false;
      this.infoOpen = false;
    },
    toggleMuted() {
      if (this.muted) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.muted = !this.muted;
    },
  },
  watch: {
    drawerOpen: {
      immediate: true,
      handler(drawerOpen) {
        if (process.client) {
          if (drawerOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    this.audio.loop = true;
    document.addEventListener("keydown", (ev) => {
      if (ev.key == "Esc") this.close();
    });
  },
};
</script>

<style scoped>
/* https://reactgo.com/nuxt-set-background-image/
assets 内の画像は style に置く必要がある */
.self-logo {
  background-image: url("~assets/navbar/logo.webp");
}
</style>
