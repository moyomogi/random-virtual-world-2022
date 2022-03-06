import Vue from "vue";

if (process.browser) {
  // https://github.com/davecat/vue-awesome-swiper
  import("vue-awesome-swiper").then((VueAwesomeSwiper) =>
    Vue.use(VueAwesomeSwiper)
  );
  // import("swiper/css/swiper.css");
}

// https://firebase.google.com/docs/storage/web/upload-files?hl=ja#web-version-9_1
// 公式解説を読むと最短で理解できる
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage, listAll } from "firebase/storage";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBtJ2EN7_JznLs03fYngKzl0nN6F9-5G9I",
  authDomain: "vuetest-103b3.firebaseapp.com",
  projectId: "vuetest-103b3",
  storageBucket: "gs://vuetest-103b3.appspot.com",
  messagingSenderId: "640887077281",
  appId: "1:640887077281:web:a87322542e2246c1f2f3e0",
};
const apps = getApps(); // 構築済み apps があれば格納
const firebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// listAll(ref(storage))
export { db, storage };
