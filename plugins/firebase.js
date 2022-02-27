// Firebase 9: https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
import path from "path";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBtJ2EN7_JznLs03fYngKzl0nN6F9-5G9I",
  authDomain: "vuetest-103b3.firebaseapp.com",
  projectId: "vuetest-103b3",
  storageBucket: "vuetest-103b3.appspot.com",
  messagingSenderId: "640887077281",
  appId: "1:640887077281:web:a87322542e2246c1f2f3e0",
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
// const db = getFirestore();
const storage = getStorage();
const storageRef = ref(storage);

// async https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
// async 関数において、返値に関しては暗黙的に Promise.resolve() でラップされる

// https://qiita.com/sotszk/items/f23199e864cba47455ce
// `Promise.resolve(/* value */)` は以下と等価
// `new Promise(resolve => resolve(/* value */))`
async function getUrlSync(devName, suffix) {
  return Promise.resolve(
    getDownloadURL(ref(storage, path.join(devName, devName + suffix)))
  );
}
async function getJsonDataSync(devName, suffix) {
  return getUrlSync(devName, suffix).then((url) =>
    fetch(url).then((res) => res.json())
  );
}

export default function injectSlides({ app }, inject) {
  let slides = [];
  listAll(storageRef).then((res) => {
    if (process.server) {
      console.log("(dbg) SSR");
      return;
    }
    console.log("(dbg) CSR");

    const developerNames = res.prefixes.map((dirRef) => dirRef.name);
    developerNames.forEach((devName) => {
      Promise.all([
        getUrlSync(devName, "_thumbnail"),
        getJsonDataSync(devName, "_.data.json"),
      ]).then((resolveList) => {
        const [localTmbUrl, jsonData] = resolveList;
        slides.push({
          tmbUrl: localTmbUrl,
          genre: jsonData.tags,
          title: jsonData.title,
          caption: jsonData.caption.replace(/\n/g, "<br>"),
        });
      });
    });
  });
  inject("slides", slides);
}
