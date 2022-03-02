<template>
  <!-- https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l -->
  <nav
    class="
      my-logo
      flex
      fixed
      w-full
      items-center
      justify-between
      px-2
      h-16
      bg-slate-900
      text-white-700
      border-b border-slate-400
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
        <img class="w-12 h-12" src="~assets/navbar/icon_burger.png" />
      </button>
      <button class="mx-2 focus:outline-none" @click="toggleMuted">
        <img
          v-if="muted"
          class="w-12 h-12"
          src="~assets/navbar/icon_vol_muted.png"
        />
        <img v-else class="w-12 h-12" src="~assets/navbar/icon_vol.png" />
      </button>
    </div>

    <!-- header (right) -->
    <div
      class="flex my-auto items-center hidden block md:flex md:justify-between"
    >
      <!-- <div class="text-slate-100">d: {{ drawerOpen }} i: {{ infoOpen }}</div> -->
      <button class="mx-2 focus:outline-none" @click="infoOpen = true">
        <img class="w-12 h-12" src="~assets/navbar/icon_info.png" />
      </button>
      <ModalApp :open="infoOpen" @close="close" />
      <a
        rel="noopener"
        href="https://ch-random.net"
        target="_blank"
        title="Computer House Random"
        :class="magentaClass"
        class="
          flex
          items-center
          p-3
          font-medium
          mx-2
          text-center
          rounded
          text-slate-100
          focus:outline-none
        "
      >
        <img class="mr-3 h-6 w-6" src="~assets/navbar/icon_hp.png" />
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
        text-slate-100
        bg-slate-900
        border-r border-slate-400
        overflow-auto
        ease-in-out
        transition-all
        duration-300
      "
      :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- sidebar (top) -->
      <a
        v-for="(genreConfig, genre) in genresDict"
        :href="'#' + genre.toLowerCase()"
        :key="genre"
        @click="close"
        class="py-4 h-12 w-full flex items-center no-underline"
      >
        <img :src="genreConfig.genreUrl" class="mx-auto h-8" />
      </a>
      <!-- sidebar (bottom) -->
      <div class="fixed bottom-0 w-full">
        <a
          rel="noopener"
          :class="cyanClass"
          class="flex items-center p-4 w-full"
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
          :class="magentaClass"
          class="flex items-center p-4 focus:outline-none"
          href="https://ch-random.net"
          target="_blank"
        >
          <img class="h-8 w-auto mr-2" src="~assets/navbar/icon_hp.png" />
          <div>
            <span class="font-bold">Home Page</span>
            <br />
            <span class="text-sm mr-3">Computer House Random</span>
          </div>
        </a>
      </div>
    </aside>
  </nav>
</template>

<script>
export default {
  // audio https://aqua-engineer.com/post-884/
  data({ $genresDict }) {
    const cyanClass = [
      "focus:bg-sky-500",
      "bg-sky-600",
      "hover:bg-sky-700"
    ];
    const magentaClass = [
      "focus:bg-pink-500",
      "bg-pink-600",
      "hover:bg-pink-700",
    ];
    return {
      genresDict: $genresDict,
      cyanClass,
      magentaClass,
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
.my-logo {
  background-image: url("~assets/navbar/logo.png");
}
</style>
