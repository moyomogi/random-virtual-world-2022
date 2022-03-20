import { db } from "~/plugins/firebase.js";
import { getDocs, collection } from "firebase/firestore";

import { genresDict } from "~/plugins/define.js";

// https://nuxtjs.org/docs/directory-structure/store/
export const state = () => ({
  postIdsDict: {},
  postTitlesDict: {},
  postGenresDict: {},
});

// function deepCopy(obj) {
//   return JSON.parse(JSON.stringify(obj));
// }

// this.$store.getters["posts/FUNC"];
export const getters = {
  getPostById(state) {
    return (id) => state.postIdsDict[id];
  },
  getPostByTitle(state) {
    return (title) => {
      const id = state.postTitlesDict[title];
      if (!id) return null;
      return state.postIdsDict[id];
    };
  },
  getPostIdsDict(state) {
    return state.postIdsDict;
  },
  getPostGenresDict(state) {
    return state.postGenresDict;
  },
};

// this.$store.commit("posts/FUNC");
export const mutations = {
  init(state, { postIdsDict, postTitlesDict, postGenresDict }) {
    state.postIdsDict = postIdsDict;
    state.postTitlesDict = postTitlesDict;
    state.postGenresDict = postGenresDict;
  },
};

// this.$store.dispatch("posts/FUNC");
// The Firebase SDK is initialized and available here!
// firebase.auth().onAuthStateChanged(user => { });
// firebase.database().ref("/path/to/ref").on("value", snapshot => { });
// firebase.firestore().doc("/foo/bar").get().then(() => { });
// firebase.functions().httpsCallable("yourFunction")().then(() => { });
// firebase.messaging().requestPermission().then(() => { });
// firebase.storage().ref("/path/to/ref").getDownloadURL().then(() => { });
// firebase.analytics(); // call to activate
// firebase.analytics().logEvent("tutorial_completed");
// firebase.performance(); // call to activate
export const actions = {
  // async https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
  // async 関数では、返値が暗黙的に `Promise.resolve(/* value */)` でラップされる
  // https://qiita.com/sotszk/items/f23199e864cba47455ce
  // `Promise.resolve(/* value */)` は以下と等価
  // `new Promise(resolve => resolve(/* value */))`
  async load({ getters, commit }) {
    // https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
    // firebase公式 https://firebase.google.com/docs/firestore/query-data/queries
    const curPostIdsDict = getters["getPostIdsDict"];
    // 既に取得済みなら return
    if (Object.keys(curPostIdsDict).length > 0) {
      return;
    }
    let postIdsDict = {};
    let postTitlesDict = {};
    let postGenresDict = {};
    const postsRef = collection(db, "posts");
    // const q = query(postsRef);
    try {
      // firestore/posts/<accessToken> を全件列挙
      const documents = await getDocs(postsRef);
      if (!documents) {
        console.warn("(posts, fetch) Invalid documents");
        return;
      }
      const genres = Object.keys(genresDict);
      genres.forEach((genre) => (postGenresDict[genre] = []));
      // .forEash() は直に付けれるが、
      // .map() は .docs.map() にしないといけない。
      documents.forEach((document) => {
        // cf: document.id == accessToken
        // console.log("(posts) document.id");
        // console.log(document.id);
        let post = document.data();
        if (!post || !document.exists()) {
          console.warn("(posts, fetch) Invalid post");
          return;
        }
        // console.log(`(posts) Sync'd ${post.title}`);
        postIdsDict[document.id] = post;
        postTitlesDict[post.title] = document.id;
        postGenresDict[post.genre].push(document.id);
      });

      // sort
      genres.forEach((genre) => postGenresDict[genre].sort());
    } catch (e) {
      console.warn("(posts, fetch) Error");
      console.warn(e);
    }
    // 引数を複数取りたい時、c++ では可変引数だが、js では Object にまとめる。
    commit("init", { postIdsDict, postTitlesDict, postGenresDict });
  },
};
