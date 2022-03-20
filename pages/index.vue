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
      title: "Random Virtual World",
      titleTemplate: "",
    };
  },
  async asyncData({ store }) {
    await store.dispatch("posts/load");
  },
};
</script>
