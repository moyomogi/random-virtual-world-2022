<template>
  <!-- https://teratail.com/questions/94302
    Firebase の Google Auth を使う際、
    type="button" を付けないと "Auth/network-request-failed"
    というエラーが出る
  -->
  <button
    :class="[
      colorsDict['signIn'].borderClass,
      colorsDict['signIn'].buttonClass,
    ]"
    class="h-9 w-24 text-black focus:outline-none rounded"
    type="button"
    @click="login"
  >
    <span
      v-if="getUserUid()"
      class="flex flex-row justify-start break-all truncate"
    >
      <img class="h-6 w-6 mx-1 rounded-full" :src="getUserIcon()" />
      {{ getUserName() }}
    </span>
    <span v-else class="flex flex-row justify-center">
      <img
        class="h-6 w-6 mr-1"
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      />
      Sign in
    </span>
  </button>
</template>

<script>
import { colorsDict } from "~/plugins/define.js";

export default {
  data() {
    return {
      // define
      colorsDict,
    };
  },
  methods: {
    getUserUid() {
      return this.$store.getters["auth/getUserUid"];
    },
    getUserIcon() {
      return this.$store.getters["auth/getUserIcon"];
    },
    getUserName() {
      return this.$store.getters["auth/getUserName"];
    },
    async login() {
      let userUid = this.getUserUid();
      if (!userUid) {
        this.$store.dispatch("auth/initFirebaseAuth");
        userUid = this.getUserUid();
      }
      await this.$store.dispatch("auth/signIn");
      // if (userUid) {
      // } else {
      //   this.$store.dispatch("auth/signOutUser");
      // }
    },
  },
};
</script>
