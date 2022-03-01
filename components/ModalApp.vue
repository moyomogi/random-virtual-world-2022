<template>
  <!-- https://tech.fusic.co.jp/posts/2020-10-26-vue-modal-sample/ -->
  <client-only>
    <modal
      @before-close="beforeClose"
      name="modal-target
          w-1/2
          bg-gray
          rounded-lg
          flex
          items-center
          justify-center
        "
      class="h-full w-full"
    >
      <h1>{{ text1 }}</h1>
      <div>{{ text2 }}</div>
    </modal>
  </client-only>
</template>

<script>
export default {
  props: { open: false, text1: "", text2: "" },
  watch: {
    open: {
      immediate: true,
      handler(open) {
        console.log("open");
        console.log(open);
        if (process.server) return;
        if (open) this.$modal.show("modal-target");
        else this.$modal.hide("modal-target");
      },
    },
  },
  methods: {
    beforeClose() {
      this.open = false;
    },
  },
};
</script>
