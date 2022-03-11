<template>
  <!-- flex-col -->
  <footer
    class="
      px-0
      md:px-4
      lg:px-12
      py-6
      w-full
      flex
      items-center
      flex-col
      md:flex-row
      border-t border-stone-400
      bg-gradient-to-l
      from-indigo-800
      via-purple-800
      to-pink-800
    "
  >
    <NuxtLink
      to="/"
      class="
        md:mx-3
        h-18
        w-auto
        flex
        items-center
        justify-center
        md:justify-start
        text-white
      "
    >
      <img class="h-24 md:h-16 w-auto" src="~assets/navbar/logo.png" />
    </NuxtLink>
    <span
      class="
        ml-0
        md:ml-3
        my-2
        md:my-0
        text-lg
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
    <span class="mr-4 inline-flex md:ml-auto justify-center md:justify-start">
      <a
        rel="noopener"
        href="https://www.youtube.com/channel/UCRJlEajdk4Yl9d7jWHw_lmw"
        target="_blank"
        title="らんだむちゃん"
        class="relative m-3 w-12 h-12 rounded-md shadow-md shadow-gray-50/50"
      >
        <img
          class="w-12 h-12 rounded-md"
          src="~assets/footer/icon_youtube.jpg"
        />
        <img
          class="absolute w-5 h-5 -right-2 -bottom-2 rounded-full"
          src="~assets/footer/youtube.svg"
        />
      </a>
      <a
        rel="noopener"
        href="https://twitter.com/c_h_random"
        target="_blank"
        title="@c_h_random"
        class="relative m-3 w-12 h-12 rounded-md shadow-md shadow-gray-900/50"
      >
        <img
          class="w-12 h-12 rounded-md"
          src="~assets/footer/icon_twitter.jpg"
        />
        <img
          class="absolute w-5 h-5 -right-2 -bottom-2 rounded-full"
          src="~assets/footer/twitter.svg"
        />
      </a>
    </span>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      cyanClass: ["focus:bg-sky-500", "bg-sky-600", "hover:bg-sky-700"],
    };
  },
};
</script>
