<template>
  <div class="self-bg flex flex-col">
    <main
      :class="colorsDict['magenta'].borderClass"
      class="
        container
        mx-4
        md:mx-auto
        my-8
        p-12
        bg-stone-100
        border-2
        rounded-xl
      "
    >
      <p>
        {{ error.statusCode }} {{ getMessage(error.statusCode) }}
        {{ error.message ? " Message: \n" + error.message : "" }}
      </p>
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
