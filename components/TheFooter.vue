<template>
  <!-- flex-col -->
  <footer
    class="
      px-0
      md:px-4
      lg:px-12
      py-6
      w-full
      flex flex-row
      justify-evenly
      md:justify-between
      border-t border-stone-400
      bg-gradient-to-l
      from-indigo-800
      via-purple-800
      to-pink-800
    "
  >
    <span
      class="md:ml-3 flex flex-col md:flex-row items-center justify-between"
    >
      <NuxtLink
        to="/"
        class="md:mr-3 flex items-center justify-start text-white"
      >
        <img class="w-40 md:w-52" src="~assets/navbar/logo.webp" />
      </NuxtLink>
      <div class="flex flex-col items-end">
        <span
          class="
            md:ml-3
            text-xs
            md:text-base
            lg:text-lg
            text-stone-300
            transision-color
            ease-in-out
            duration-500
          "
        >
          <a
            class="hover:text-stone-100"
            rel="noopener"
            href="https://ch-random.net"
            target="_blank"
            >&copy; 2022 Computer House Random</a
          >
        </span>
        <span
          class="
            md:ml-3
            text-sm
            transision-color
            ease-in-out
            duration-500
          "
        >
          <!--
            @mouseover https://newsite-make.com/vue-img-change/
          -->
          <a
            :class="favicon_github_text_cols[favicon_github_index]"
            class="flex flex-row items-center space-x-1"
            @mouseover="onOverGitHubFavicon()"
            @mouseout="onOutGitHubFavicon()"
            rel="noopener"
            href="https://github.com/moyomogi/rvw2022s"
            target="_blank"
          >
            <img
              class="w-4 h-4"
              :src="favicon_github_srcs[favicon_github_index]"
            />
            <span>Source Code</span>
          </a>
        </span>
      </div>
    </span>
    <span class="inline-flex justify-end">
      <a
        rel="noopener"
        href="https://www.youtube.com/channel/UCRJlEajdk4Yl9d7jWHw_lmw"
        target="_blank"
        title="らんだむちゃん"
        class="relative m-3 w-fit h-fit rounded-md shadow-md shadow-gray-50/50"
      >
        <img
          class="w-12 h-12 rounded-md"
          src="~assets/footer/random_youtube.webp"
        />
        <img
          class="absolute w-5 h-5 -right-2 -bottom-2 rounded-full"
          src="~assets/footer/favicon_youtube.svg"
        />
      </a>
      <a
        rel="noopener"
        href="https://twitter.com/c_h_random"
        target="_blank"
        title="@c_h_random"
        class="relative m-3 w-fit h-fit rounded-md shadow-md shadow-gray-900/50"
      >
        <img
          class="w-12 h-12 rounded-md"
          src="~assets/footer/random_twitter.webp"
        />
        <img
          class="absolute w-5 h-5 -right-2 -bottom-2 rounded-full"
          src="~assets/footer/favicon_twitter.svg"
        />
      </a>
    </span>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      favicon_github_index: 0,
      favicon_github_srcs: [
        "/footer/favicon_github.webp",
        "/footer/favicon_github_hover.webp",
      ],
      favicon_github_text_cols: ["text-stone-300", "text-stone-100"],
    };
  },
  methods: {
    onOverGitHubFavicon() {
      this.favicon_github_index = 1;
    },
    onOutGitHubFavicon() {
      this.favicon_github_index = 0;
    },
  },
};
</script>
