// https://nuxtjs.org/docs/directory-structure/store/
export const state = () => ({});

// this.$store.getters["FILE_NAME/FUNC"];
// export const getters = {};

// this.$store.commit("FILE_NAME/FUNC");
// export const mutations = {};

// this.$store.dispatch("FILE_NAME/FUNC");
export const actions = {
  // nuxtServerInit: SSR でのみ実行される
  async nuxtServerInit({ dispatch }) {
    await dispatch("posts/load");
  },
};
