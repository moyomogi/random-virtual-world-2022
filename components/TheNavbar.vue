<template>
  <!-- https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l -->
  <nav
    class="
      flex
      fixed
      w-full
      items-center
      justify-between
      px-2
      h-16
      bg-slate-900
      text-white-700
      border-b border-gray
      z-10
      bg-contain bg-no-repeat
      bg-center
    "
    style="background-image: url('/navbar/logo.png')"
  >
    <div class="flex items-center">
      <button
        class="mx-2 focus:outline-none"
        aria-label="Open menu"
        @click="toggleDrawer"
      >
        <img class="w-12 h-12" src="/navbar/icon_burger.png" />
      </button>
      <button class="mx-2 focus:outline-none" @click="toggleMuted">
        <img v-if="muted" class="w-12 h-12" src="/navbar/icon_vol_muted.png" />
        <img v-else class="w-12 h-12" src="/navbar/icon_vol.png" />
      </button>
    </div>
    <!-- <img src="/navbar/logo.png" class="mx-auto h-12 w-auto z-20" /> -->
    <div class="flex items-center">
      <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
        <button class="mx-2 focus:outline-none" @click="infoOpen = true">
          <img class="w-12 h-12" src="/navbar/icon_info.png" />
        </button>
        <ModalApp :open="infoOpen" text1="RVW について" text2="RVW は大阪府立大学の部活、コンピューターハウスランダムの作品展示リレー企画です。中止になった 2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽) を展示します。無料でダウンロード・ウェブ上でプレイできます。"/>
        <a
          rel="noopener"
          href="https://ch-random.net"
          target="_blank"
          title="Computer House Random"
          class="
            flex
            items-center
            px-3
            font-medium
            mx-2
            text-center
            bg-orange-600
            rounded
            text-white
            hover:bg-orange-700
            focus:outline-none focus:bg-orange-400
          "
        >
          <img
            class="mr-3 h-6 w-auto"
            src="/navbar/icon_hp.png"
          />
          <p class="font-bold">Home Page</p></a
        >
      </div>
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
        @keydown.esc="drawerOpen = false"
        v-show="drawerOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="drawerOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>

    <!-- navbar -->
    <aside
      class="
        transform
        top-0
        left-0
        w-64
        bg-slate-900
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        border-r border-gray
        z-30
      "
      :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <a
        v-for="(genreConfig, genre) in genresDict"
        :href="genreConfig.id"
        :key="genre"
        @click="drawerOpen = false"
        class="py-4 h-12 w-full flex items-center no-underline"
      >
        <img :src="genreConfig.genreUrl" class="mx-auto h-8" />
      </a>
      <div class="fixed bottom-0 w-full">
        <a
          rel="noopener"
          class="
            flex
            items-center
            p-4
            text-white
            bg-blue-500
            hover:bg-blue-600
            w-full
          "
          href="https://twitter.com/intent/tweet?text=RVW%20%7C%20Computer%20House%20Random&url=https://vuetest-103b3.firebaseapp.com&via=c_h_random"
          target="_blank"
        >
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="h-6 w-6 mr-2"
          >
            <path
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            ></path>
          </svg>
          <span>Share</span>
        </a>
        <a
          rel="noopener"
          class="
            flex
            items-center
            p-4
            bg-orange-600
            hover:bg-orange-700
            focus:outline-none focus:bg-orange-400
            text-white
          "
          href="https://ch-random.net"
          target="_blank"
        >
          <img class="h-8 w-auto mr-2" src="/navbar/icon_hp.png" />
          <div>
            <span class="font-bold">Home Page</span>
            <br />
            <span class="text-sm text-white mr-3">Computer House Random</span>
          </div>
        </a>
      </div>
    </aside>
  </nav>
</template>

<script>
import ModalApp from "~/components/ModalApp.vue";

export default {
  components: {
    ModalApp,
  },
  // audio https://aqua-engineer.com/post-884/
  data({ $genresDict }) {
    return {
      genresDict: $genresDict,
      drawerOpen: false,
      infoOpen: false,
      audio: process.client ? new Audio("/bgm.mp3") : null,
      muted: true,
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
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
          // document.body.style.removeProperty("overflow", drawerOpen ? "hidden" : null);
        }
      },
    },
    // infoOpen: {
    //   immediate: true,
    //   handler(infoOpen) {
    //     if (process.client) {
    //       document.body.style.removeProperty("overflow", infoOpen ? "hidden" : null);
    //       console.log("infoOpen");
    //       console.log(infoOpen);
    //       if (infoOpen) {
    //         this.$modal.show("modal-info")
    //       } else {
    //         this.$modal.hide("modal-info")
    //       }
    //     }
    //   },
    // },
  },
  mounted() {
    document.addEventListener("keydown", (ev) => {
      if (ev.key == "Esc") this.drawerOpen = false;
    });
  },
};
</script>
