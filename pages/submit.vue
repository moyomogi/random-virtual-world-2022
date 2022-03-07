<template>
  <div class="self-bg flex flex-col">
    <main
      :class="colorsDict[genresDict[genre].color].borderClass"
      class="
        container
        mx-4
        md:mx-auto
        my-8
        p-12
        space-y-8
        bg-stone-100
        border-4
        rounded-xl
      "
    >
      <!--
        main, article, section は div と同じ役割です。
        全部 div でもいいですが、コードを見やすくするために振り分けていま
        す。
        また、ウェブスクレイピングがしやすくなるという利点もあります。
      -->
      <!-- https://www.tailwindtoolbox.com/templates/multi-section-form -->
      <form class="space-y-4">
        <!-- title -->
        <section class="md:flex">
          <label
            class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
            for="title"
            >タイトル</label
          >
          <div class="md:w-5/6">
            <input
              type="text"
              id="title"
              v-model="title"
              class="
                py-1
                px-3
                w-full
                bg-stone-200
                rounded
                border border-gray-300
                focus:border-sky-500
                focus:bg-white
                focus:ring-2
                focus:ring-sky-200
                text-base
                outline-none
                text-stone-800
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
            <p v-if="errTitle()" class="py-2 text-sm text-red-600">
              {{ errTitle() }}
            </p>
            <p v-else-if="warnTitle()" class="py-2 text-sm text-yellow-600">
              {{ warnTitle() }}, アップデートにはアクセストークンが必要です。
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              OK: len(self.title) &gt; 0
            </p>
          </div>
        </section>

        <!-- body -->
        <section class="md:flex">
          <label
            class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
            for="body"
            >内容説明 (※操作説明は zip 内 readme.txt へ)</label
          >
          <div class="md:w-5/6">
            <textarea
              id="body"
              v-model="body"
              class="
                py-1
                px-3
                h-48
                w-full
                bg-stone-200
                rounded
                border border-gray-300
                focus:border-sky-500
                focus:bg-white
                focus:ring-2
                focus:ring-sky-200
                text-base
                outline-none
                text-stone-800
                resize-none
                leading-6
                transition-colors
                duration-200
                ease-in-out
              "
            ></textarea>
            <p v-if="errBody()" class="py-2 text-sm text-red-600">
              {{ errBody() }}
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              OK: len(self.body) &gt; 0
            </p>
          </div>
        </section>

        <!-- url -->
        <section class="md:flex">
          <label
            class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
            for="url"
            >作品 URL</label
          >
          <div class="md:w-5/6">
            <input
              type="text"
              id="url"
              v-model="url"
              class="
                py-1
                px-3
                w-full
                bg-stone-200
                rounded
                border border-gray-300
                focus:border-sky-500
                focus:bg-white
                focus:ring-2
                focus:ring-sky-200
                text-base
                outline-none
                text-stone-800
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
            <!-- "https?://.*" -->
            <p v-if="errUrl()" class="py-2 text-sm text-red-600">
              {{ errUrl() }}
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              OK: re.match("https?://.*", self.url) != None
            </p>
          </div>
        </section>

        <!-- genre -->
        <section class="md:flex">
          <div class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left">
            ジャンル (一択)
          </div>
          <div class="md:w-5/6">
            <label
              v-for="(_, gnr) in genresDict"
              :key="gnr"
              :for="gnr"
              :class="colorsDict[genresDict[gnr].color].textClass"
              class="inline-flex items-center"
            >
              <input
                type="radio"
                class="form-radio text-indigo-600"
                :id="gnr"
                :value="gnr"
                v-model="genre"
              />
              <span
                :class="[
                  colorsDict[genresDict[gnr].color].textClass,
                  colorsDict[genresDict[gnr].color].bgClass,
                ]"
                class="
                  inline-block
                  ml-1
                  mr-3
                  px-2
                  py-1
                  text-xs
                  rounded-full
                  font-semibold
                  tracking-wide
                "
                >{{ genresDict[gnr].aka }}</span
              >
            </label>
          </div>
        </section>

        <!-- supportedEnvs -->
        <section class="md:flex">
          <div class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left">
            対応環境 (複択可)
          </div>
          <div class="md:w-5/6">
            <div
              v-for="(val, env) in envsDict"
              :key="env"
              class="inline-flex items-center"
            >
              <input
                type="checkbox"
                :id="env"
                class="text-indigo-600"
                :value="env"
                v-model="supportedEnvs"
              />
              <label
                :for="env"
                :class="[
                  colorsDict[val.color].textClass,
                  colorsDict[val.color].bgClass,
                ]"
                class="
                  inline-block
                  ml-1
                  mr-3
                  px-2
                  py-1
                  text-xs
                  rounded-full
                  font-semibold
                  tracking-wide
                "
                >{{ val.aka }}</label
              >
            </div>
            <p v-if="errSupportedEnvs()" class="py-2 text-sm text-red-600">
              {{ errSupportedEnvs() }}
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              {{ supportedEnvs.map((env) => envsDict[env].aka).join(", ") }}
            </p>
          </div>
        </section>

        <!-- authors -->
        <section class="md:flex">
          <div class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left">
            作者 (複択可)
          </div>
          <div class="md:w-5/6">
            <div
              v-for="(val, athr) in authorsDict"
              :key="athr"
              class="inline-flex items-center"
            >
              <input
                type="checkbox"
                :id="athr"
                class="form-checkbox text-indigo-600"
                :value="athr"
                v-model="authors"
              />
              <label :for="athr" class="ml-1 mr-2"
                >{{ val.name }} ({{ val.year }})</label
              >
            </div>
            <p v-if="errAuthors()" class="py-2 text-sm text-red-600">
              {{ errAuthors() }}
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              {{ authors.map((athr) => authorsDict[athr].name).join(", ") }}
            </p>
          </div>
        </section>

        <!-- picDetails -->
        <section class="md:flex">
          <div class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left">
            画像 (1～4 枚, 16:9)
          </div>
          <div class="md:w-5/6">
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              class="p-1 text-sky-600 bg-sky-100 rounded"
              @change="addPics($event)"
              multiple
            />
            <!-- container:
                  w-1/2, h-3/4 系のクラスと呼応的に使用し、
                  100% の基準となるクラスです。
            -->
            <div class="container flex flex-wrap">
              <div
                v-for="(detail, idx) in picDetails"
                :key="idx"
                class="mx-auto px-2 w-11/12 md:w-1/4 md:flex md:flex-row"
              >
                <div
                  class="
                    p-1
                    items-center
                    bg-stone-400
                    rounded-lg
                    drop-shadow
                    flex flex-col
                  "
                >
                  <img class="mx-2 max-h-48" :src="detail.base64" />
                  <span
                    v-if="parseInt(detail.bytes.size) > maxBytes"
                    class="py-2 text-sm text-red-600"
                    >NG: {{ parseBytes(parseInt(detail.bytes.size)) }} &gt;
                    {{ parseBytes(maxBytes) }}</span
                  >
                  <span v-else class="py-2 text-sm text-stone-800"
                    >OK: {{ parseBytes(parseInt(detail.bytes.size)) }} &lt;=
                    {{ parseBytes(maxBytes) }}</span
                  >
                  <button
                    :class="colorsDict[genresDict[genre].color].buttonClass"
                    class="
                      mx-auto
                      px-1
                      focus:outline-none
                      text-white
                      font-sm
                      rounded
                    "
                    type="button"
                    @click="dumpPic(idx)"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
            <p v-if="errPics()" class="py-2 text-sm text-red-600">
              {{ errPics() }}
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              OK: len(self.pics) == {{ picDetails.length }}
            </p>
          </div>
        </section>

        <!-- Submit -->
        <section class="py-1 md:flex md:items-center">
          <div class="md:w-1/6"></div>
          <div class="md:w-auto">
            <button
              :class="
                colorsDict[submitErrIfAny() ? 'gray' : genresDict[genre].color]
                  .buttonClass
              "
              class="px-4 py-2 focus:outline-none text-white font-bold rounded"
              type="button"
              @click="submitPost(false)"
            >
              Submit
            </button>
            <span v-if="submitErrIfAny()" class="ml-3 text-sm text-red-600">{{
              submitErrIfAny()
            }}</span>
            <span
              v-else-if="submitMessage"
              class="ml-3 text-sm text-gray-600"
              >{{ submitMessage }}</span
            >
            <span v-else class="ml-3 text-sm text-gray-600">OK</span>
          </div>
        </section>

        <!-- info -->
        <p class="py-2">
          ・この投稿は
          <NuxtLink
            rel="noopener"
            :to="`/posts/${title}`"
            target="_blank"
            class="
              mx-1
              inline
              text-pink-600
              bg-pink-100
              underline
              decoration-pink-600
              rounded
            "
          >
            https://vuetest-103b3.firebaseapp.com/posts/{{ title }}</NuxtLink
          >
          にて公開されます。
          <br />
          ・この投稿のアクセストークンは
          <span class="mx-1 inline text-pink-600 bg-pink-100 rounded">{{
            accessToken
          }}</span
          >です。
          <br />
          ・また、動作軽量化と実装難易度の観点から DTM のプラウザ上再生および
          WebGL は実装しない予定です。DTM は zip で配布してください。
        </p>

        <!-- 水平線 (所謂 hr) -->
        <div class="border-t border-stone-800"></div>

        <!-- yourAccessToken -->
        <section class="md:flex">
          <label
            class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
            for="your-access-token"
            >アクセストークン</label
          >
          <div class="md:w-5/6">
            <input
              type="text"
              id="your-access-token"
              v-model="yourAccessToken"
              class="
                py-1
                px-3
                w-full
                bg-stone-200
                rounded
                border border-gray-300
                focus:border-sky-500
                focus:bg-white
                focus:ring-2
                focus:ring-sky-200
                text-base
                outline-none
                text-stone-800
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
            <p v-if="errYourAccessToken()" class="py-2 text-sm text-red-600">
              {{ errYourAccessToken() }}
            </p>
            <p v-else class="py-2 text-sm text-gray-600">
              OK: self.accessToken in submittedAccessTokens,
              {{ accessTokensDict[yourAccessToken] }}
            </p>
          </div>
        </section>

        <!-- info -->
        <p class="py-2">
          ・投稿の Update
          には、アクセストークンが必要です。アクセストークンは、このページの最下部にある「Submit
          済み投稿一覧」を参照してください。
          <br />
          ・投稿の Update には、Submit ボタンではなく、Update
          ボタンを押してください。 ・この投稿のアクセストークンは
          <span class="mx-1 inline text-pink-600 bg-pink-100 rounded">{{
            yourAccessToken
          }}</span
          >です。
        </p>

        <!-- Update -->
        <section class="py-1 md:flex md:items-center">
          <div class="md:w-1/6"></div>
          <div class="md:w-auto">
            <button
              :class="
                colorsDict[updateErrIfAny() ? 'gray' : genresDict[genre].color]
                  .buttonClass
              "
              class="px-4 py-2 focus:outline-none text-white font-bold rounded"
              type="button"
              @click="submitPost(true)"
            >
              Update
            </button>
            <span v-if="updateErrIfAny()" class="ml-3 text-sm text-red-600">{{
              updateErrIfAny()
            }}</span>
            <span
              v-else-if="updateMessage"
              class="ml-3 text-sm text-gray-600"
              >{{ updateMessage }}</span
            >
            <span v-else class="ml-3 text-sm text-gray-600">OK</span>
          </div>
        </section>

        <!-- 水平線 (所謂 hr) -->
        <div class="border-t border-stone-800"></div>

        <!-- info -->
        <p class="py-2">
          ・データベースに書きこまれる内容 (json 形式):
          <br />
          <span
            class="
              whitespace-pre-line
              break-all
              inline-block
              w-full
              text-sky-600
              bg-sky-100
              rounded
            "
            >{{ JSON.stringify(getPost()) }}</span
          >
          ・Submit 済み投稿一覧:
          <br />
          <span
            v-for="(curTitle, curAccessToken) in accessTokensDict"
            :key="curAccessToken"
            class="inline-block w-full text-sky-600 bg-sky-100 rounded"
            >{{ curTitle }} ({{ curAccessToken }})
          </span>
        </p>
      </form>
    </main>
  </div>
</template>

<script>
// https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
import { db, storage } from "~/plugins/firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

import {
  genresDict,
  authorsDict,
  colorsDict,
  envsDict,
} from "~/plugins/define.js";

function getRandom(digit) {
  if (!digit) digit = 12;
  const pattern =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let res = "";
  for (let i = 0; i < digit; i++) {
    res += pattern[Math.floor(Math.random() * pattern.length)];
  }
  return res;
}
export default {
  data() {
    return {
      // Submit 用
      title: "羽衣ララ",
      accessToken: getRandom(12),
      body: "羽衣ララは、惑星サマーン出身の宇宙人。地球の年齢では13歳だが、惑星サマーンでは大人扱い。フワとプルンスと一緒にロケットに乗って伝説の戦士プリキュアを探す旅をしている最中、フワの力で地球にワープしてしまう。責任感が強くて真面目だけど、ちょっと抜けているところも。チャームポイントは頭についたセンサー。天の川のプリキュア「キュアミルキー」に変身！",
      url: "https://vuetest-103b3.web.app",
      genre: "puzzle",
      supportedEnvs: [],
      authors: [],
      pics: null,
      picDetails: [],
      // for internal system
      maxBytes: 5 * 1024 * 1024, // 5 MB 以下
      submitMessage: null,
      updateMessage: null,
      // Update 用
      yourAccessToken: "",
      // asyncData
      accessTokensDict: {},
      // define
      genresDict,
      authorsDict,
      colorsDict,
      envsDict,
    };
  },
  // https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
  methods: {
    parseBytes(b) {
      if (!b) b = 0;
      const units = ["bytes", "KB", "MB", "GB"];
      let i = 0;
      for (; i < units.length; i++) {
        if (b < 1024) break;
        b = Math.round(b) / 1024;
      }
      return `${b} ${units[i]}`;
    },
    errTitle() {
      if (this.title.length) return null;
      return "NG: len(self.title) == 0";
    },
    warnTitle() {
      for (const [_, curTitle] of Object.entries(this.accessTokensDict)) {
        if (curTitle === this.title) return "Submission is not allowed: self.title in submittedTitles";
      }
      return null;
    },
    errBody() {
      if (this.body.length) return null;
      return "NG: len(self.body) == 0";
    },
    errUrl() {
      // regexp の pattern のオプションフラグについて。
      // /../g: global search。
      //        一度マッチしても終了せず、複数個マッチ。
      // /../m: 複数行の時、各行に対して ^, $ がマッチする
      // /../u: unicode (漢字など) 対応
      const pattern = /^https?:\/\/.*$/u;
      if (pattern.test(this.url)) return null;
      return 'NG: re.match("https?://.*", self.url) == None';
    },
    errSupportedEnvs() {
      if (this.supportedEnvs.length) return null;
      return "NG: len(self.supportedEnvs) == 0";
    },
    errAuthors() {
      if (this.authors.length) return null;
      return "NG: len(self.authors) == 0";
    },
    errPics() {
      if (this.picDetails.length === 0) {
        return "NG: len(self.pics) == 0";
      }
      for (let i = 0; i < this.picDetails.length; i++) {
        const detail = this.picDetails[i];
        if (parseInt(detail.bytes.size) > this.maxBytes) {
          return `pics[${i}]: ${this.parseBytes(
            parseInt(detail.bytes.size)
          )} > ${this.parseBytes(this.maxBytes)}`;
        }
      }
      return null;
    },
    submitErrIfAny() {
      const funcs = [
        this.errTitle,
        this.warnTitle, // *
        this.errBody,
        this.errUrl,
        this.errSupportedEnvs,
        this.errAuthors,
        this.errPics,
      ];
      for (let i = 0; i < funcs.length; i++) {
        const err = funcs[i]();
        if (err !== null) return err;
      }
      return null;
    },
    errYourAccessToken() {
      const valid = Object.keys(this.accessTokensDict).some((accessToken) => {
        return accessToken === this.yourAccessToken;
      });
      if (valid) return null;
      return "NG: self.accessToken not in submittedAccessTokens";
    },
    updateErrIfAny() {
      const funcs = [
        this.errTitle,
        this.errBody,
        this.errUrl,
        this.errSupportedEnvs,
        this.errAuthors,
        this.errPics,
        this.errYourAccessToken, // *
      ];
      for (let i = 0; i < funcs.length; i++) {
        const err = funcs[i]();
        if (err !== null) return err;
      }
      return null;
    },
    addPics(ev) {
      this.pics = null;
      const files = ev.target.files;
      const len = this.picDetails.length;
      for (let i = 0; i < files.length; i++) {
        if (!files[i]) {
          console.warn(`files[${i}] == null`);
          continue;
        }
        this.picDetails.push({
          bytes: files[i],
          base64: "",
          pic: "",
        });

        // https://okinawanpizza.hatenablog.com/entry/2020/12/29/120807
        // 入力画像を base64 化する
        const rd = new FileReader();
        rd.onload = (evRd) =>
          (this.picDetails[i + len].base64 = evRd.target.result);
        rd.readAsDataURL(files[i]); // base64 埋め込み

        // https://volpe.hatenablog.com/entry/2019/04/10/094732
        // 逐次画像アップロード
        // const storageRef = ref(storage, `${this.title}/${getRandom(10)}`);
        // uploadBytes(storageRef, files[i]).then(async (snapshot) => {
        //   this.picDetails[i].pic = await getDownloadURL(snapshot.ref);
        // });
      }
    },
    dumpPic(idx) {
      this.pics = null;
      // splice https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array
      this.picDetails.splice(idx, 1);
    },
    getPost() {
      const dt = new Date();
      const updatedTime = `${dt.getFullYear()}/${
        dt.getMonth() + 1
      }/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`;
      return {
        title: this.title,
        body: this.body,
        url: this.url,
        genre: this.genre,
        supportedEnvs: this.supportedEnvs,
        authors: this.authors,
        pics: this.pics
          ? this.pics
          : this.picDetails.map(() => "<Ungenerated URL>"),
        updatedTime,
      };
    },
    async submitPost(updates) {
      const err = updates ? this.updateErrIfAny() : this.submitErrIfAny();
      if (err) {
        alert(err);
        return;
      }
      const accessToken = updates ? this.yourAccessToken : this.accessToken;
      {
        // firestore は 1 GB で、クエリ処理が速い
        // firestore/redirects/<title>/ に json を送信
        if (updates) {
          this.updateMessage = `POST: firestore/redirects/${this.title}`;
        } else {
          this.submitMessage = `POST: firestore/redirects/${this.title}`;
        }
        const docRef = doc(db, "redirects", this.title);
        try {
          const redirect = { redirect: accessToken };
          await setDoc(docRef, redirect);
        } catch (e) {
          alert("(submitPost, redirects) Error");
          console.error(e);
          return;
        }
      }
      // storage は 10 GB で、クエリ処理が遅い
      // storage/posts/<accessToken>/ に画像群を送信
      let post = this.getPost();
      // 長さ this.picDetails.length の空配列
      this.pics = Array(this.picDetails.length);
      for (let i = 0; i < this.picDetails.length; i++) {
        if (updates) {
          this.updateMessage = `POST: storage/posts/${accessToken}/pic${i + 1}`;
        } else {
          this.submitMessage = `POST: storage/posts/${accessToken}/pic${i + 1}`;
        }
        const bytes = this.picDetails[i].bytes;
        const storageRef = ref(storage, `${accessToken}/pic${i + 1}`);
        await uploadBytes(storageRef, bytes).then(
          async (snapshot) =>
            (this.pics[i] = await getDownloadURL(snapshot.ref))
        );
      }
      post.pics = [];
      this.pics.forEach((pic) => {
        if (pic) post.pics.push(pic);
      });
      // firestore/posts/<accessToken>/ に json を送信
      if (updates) {
        this.updateMessage = `POST: firestore/posts/${accessToken}`;
      } else {
        this.submitMessage = `POST: firestore/posts/${accessToken}`;
      }
      const docRef = doc(db, "posts", accessToken);
      try {
        await setDoc(docRef, post);
        console.log("(submit, submitPost, posts) Success");
        if (updates) {
          this.updateMessage = "Updated!";
        } else {
          this.submitMessage = "Submitted!";
        }
      } catch (e) {
        alert("(submit, submitPost, posts) Error");
        console.error(e);
        return;
      }
      // // The Firebase SDK is initialized and available here!
      // firebase.auth().onAuthStateChanged(user => { });
      // firebase.database().ref("/path/to/ref").on("value", snapshot => { });
      // firebase.firestore().doc("/foo/bar").get().then(() => { });
      // firebase.functions().httpsCallable("yourFunction")().then(() => { });
      // firebase.messaging().requestPermission().then(() => { });
      // firebase.storage().ref("/path/to/ref").getDownloadURL().then(() => { });
      // firebase.analytics(); // call to activate
      // firebase.analytics().logEvent("tutorial_completed");
      // firebase.performance(); // call to activate
    },
  },
  async asyncData({ error }) {
    // firestore/posts/<accessToken>/ を見て this.accessTokensDict を生成
    let accessTokensDict = {};
    const docRef = collection(db, "posts");
    try {
      const documents = await getDocs(docRef);
      if (!documents) {
        console.warn("");
        return;
      }
      documents.forEach((document) => {
        accessTokensDict[document.id] = document.data().title;
      });
    } catch (e) {
      console.warn("(submit, asyncData) Error");
      console.warn(e);
      error({
        statusCode: 500,
        message: "Fatal error",
      });
    }
    return { accessTokensDict };
  },
};
</script>
