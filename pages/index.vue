<template>
  <div>
    <TheConceptArt />
    <div class="self-bg flex flex-col">
      <TheSlides />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "RVW 2022 Spring",
      titleTemplate: "",
      meta: [
        { hid: "og:image", property: "og:image", content: "/ogp.webp" },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/ogp.webp",
        },
      ],
    };
  },
  async asyncData({ store }) {
    await store.dispatch("posts/load");
  },
};
</script>
