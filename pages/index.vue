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
    };
  },
  async asyncData({ store }) {
    await store.dispatch("posts/load");
  },
};
</script>
