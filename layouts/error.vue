<template>
  <div class="self-bg flex flex-col">
    <main
      :class="[
        colorsDict['magenta'].borderClass,
        colorsDict['magenta'].shadowClass,
      ]"
      class="
        container
        mx-auto
        my-8
        p-12
        bg-stone-100
        border-4
        rounded-xl
        shadow-lg
      "
    >
      <p class="text-lg">{{ error.statusCode }} {{ getMessage(error.statusCode) }}</p>
      <p v-if="error.message">{{ error.message }}</p>
    </main>
    <TheSlides />
  </div>
</template>

<script>
import { colorsDict } from "~/plugins/define.js";

function getMessage(statusCode) {
  switch (statusCode) {
    case 403:
      return "Forbidden";
    case 404:
      return "Page not found";
    case 500:
      return "Internal server error";
    default:
      return "Error";
  }
}
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      getMessage,
      // define
      colorsDict,
    };
  },
  head() {
    return {
      title: getMessage(this.error.statusCode),
    };
  },
};
</script>
