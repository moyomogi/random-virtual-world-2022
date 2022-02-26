// Firebase 9: https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
import path from "path";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
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


// https://qiita.com/sotszk/items/f23199e864cba47455ce
// `Promise.resolve(/* value */)` は以下と等価
// `new Promise(resolve => resolve(/* value */))`
async function getUrlSync(devName, suffix) {
  return Promise.resolve(getDownloadURL(ref(storage, path.join(devName, devName + suffix))));
}
async function getJsonDataSync(devName, suffix) {
  return getUrlSync(devName, suffix)
    .then(url => (fetch(url).then(res => res.json())));
}

// async function createHtmlSync({ title, caption, genre, URL, iconUrl, tmbUrl, img1Url, img2Url, img3Url }) {
//   return new Promise((resolve, reject) => {
//     const slideEl = document.getElementById("slide");
//     const slideTopEl = document.getElementById("slide-top");

//     if (slideEl === null) {
//       console.warn("(warn) slideEl === null");
//       return;
//     }

//     console.log("(loc) createHtmlSync");
//     console.log(title);
//     console.log(caption);

//     // コンソール上では、data が正常に渡されたと見えてしまう
//     // 辞書型である data はそのままでは渡せない
//     // console.log(data);

//     // <swiper-slide>
//     console.log("swiperSlideEl 作成");
//     const swiperSlideEl = document.createElement("swiper-slide");
//     swiperSlideEl.style.backgroundImage = "url(" + tmbUrl + ")";
//     // slideTopEl の上に挿入
//     slideEl.insertBefore(swiperSlideEl, slideTopEl);

//     // .title
//     console.log("titleEl 作成");
//     const titleEl = document.createElement("div");
//     titleEl.className = "title";
//     titleEl.setAttribute("style", "data-swiper-parallax=-100");
//     titleEl.innerHTML = "【" + String(title) + "】";
//     swiperSlideEl.appendChild(titleEl);

//     // .subtitle
//     console.log("genreEl 作成");
//     const genreEl = document.createElement("div");
//     genreEl.className = "subtitle";
//     genreEl.setAttribute("style", "data-swiper-parallax=-240");
//     genreEl.textContent = genre;
//     swiperSlideEl.appendChild(genreEl);

//     // .text
//     console.log("captionEl, captionChildEl 作成");
//     const captionEl = document.createElement("div");
//     captionEl.className = "text";
//     captionEl.setAttribute("style", "data-swiper-parallax=-360");
//     const captionChildEl = document.createElement("p");
//     captionChildEl.innerHTML = caption.replace(/\n/g, "<br>");
//     captionEl.appendChild(captionChildEl);
//     swiperSlideEl.appendChild(captionEl);

//     console.log("スライド作成完了");
//   });
// }

// async, await https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
// async 関数において、返値に関しては暗黙的に Promise.resolve() でラップされる
export default async function loadSlide() {
  listAll(storageRef).then(res => {
    if (process.server) {
      console.log("(dbg) SSR");
      return;
    }
    console.log("(dbg) CSR");

    const developerNames = res.prefixes.map(dirRef => dirRef.name);
    const slideEl = document.getElementById("slide");
    const slideTopEl = document.getElementById("slide-top");

    developerNames.forEach(devName => {
      const promises = [
        getUrlSync(devName, "_thumbnail"),
        getJsonDataSync(devName, "_.data.json"),
      ];
      Promise.all(promises).then(
        resolveList => {
          const [tmbUrl, jsonData] = resolveList;

          // <swiper-slide>
          console.log("swiperSlideEl 作成");
          const swiperSlideEl = document.createElement("swiper-slide");
          swiperSlideEl.setAttribute("style", `background-image:url('${tmbUrl}')`);
          // slideTopEl の上に挿入
          slideEl.insertBefore(swiperSlideEl, slideTopEl);
          console.log("swiperSlideEl");
          console.log(swiperSlideEl);

          console.log("jsonData");
          console.log(jsonData);
          const parsed = JSON.parse(JSON.stringify(jsonData));
          console.log("parsed");
          console.log(parsed);

          // .title
          console.log("titleEl 作成");
          const titleEl = document.createElement("div");
          titleEl.className = "title";
          titleEl.setAttribute("style", "data-swiper-parallax=-100");
          titleEl.innerHTML = parsed.title;
          swiperSlideEl.appendChild(titleEl);

          // .subtitle
          console.log("genreEl 作成");
          const genreEl = document.createElement("div");
          genreEl.className = "subtitle";
          genreEl.setAttribute("style", "data-swiper-parallax=-240");
          genreEl.textContent = parsed.tags;
          swiperSlideEl.appendChild(genreEl);

          // .text
          console.log("captionEl, captionChildEl 作成");
          const captionEl = document.createElement("div");
          captionEl.className = "text";
          captionEl.setAttribute("style", "data-swiper-parallax=-360");
          const captionChildEl = document.createElement("p");
          captionChildEl.innerHTML = parsed.caption.replace(/\n/g, "<br>");
          captionEl.appendChild(captionChildEl);
          swiperSlideEl.appendChild(captionEl);

          console.log("(dbg) スライド作成完了");
        })
    });
  });
}
