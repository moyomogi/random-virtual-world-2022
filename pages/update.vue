<template>
  <div class="self-bg flex flex-col items-center">
    <form
      :class="[
        colorsDict[genresDict[post.genre].color].borderClass,
        colorsDict[genresDict[post.genre].color].shadowClass,
      ]"
      class="
        container
        mx-auto
        my-8
        p-12
        space-y-4
        bg-stone-100
        border-4
        rounded-xl
        shadow-lg
      "
    >
      <!-- https://www.tailwindtoolbox.com/templates/multi-section-form -->
      <!-- h1 -->
      <h1 class="pb-4 flex text-gray-600 font-bold">
        <p class="mx-auto space-x-4">
          <NuxtLink to="/submit" class="text-base text-sky-600 underline"
            >初回投稿</NuxtLink
          >
          <span class="text-2xl text-gray-600">更新</span>
        </p>
      </h1>

      <section class="md:flex">
        <div class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left">
          更新したい記事 (一択)
        </div>
        <div class="md:w-5/6">
          <span v-for="(_, gnr) in genresDict" :key="gnr">
            <label
              v-for="curPostId in postGenresDict[gnr]"
              :key="curPostId"
              :for="curPostId"
              class="p-1 inline-flex items-center"
            >
              <input
                type="radio"
                class="form-radio text-indigo-600"
                :id="curPostId"
                :value="curPostId"
                v-model="postId"
              />
              <div class="flex-col rounded-lg overflow-hidden">
                <img
                  :src="getPostById(curPostId).pics[0]"
                  class="w-24 aspect-video bg-white object-cover"
                />
                <p
                  :class="[
                    colorsDict[genresDict[getPostById(curPostId).genre].color]
                      .textClass,
                    colorsDict[genresDict[getPostById(curPostId).genre].color]
                      .bgClass,
                  ]"
                  class="w-24 text-sm break-all truncate"
                >
                  ({{ genresDict[gnr].aka }})
                  <br />
                  {{ getPostById(curPostId).title }}
                </p>
              </div>
            </label>
          </span>
        </div>
      </section>

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
            v-model="post.title"
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
          <p :class="msgColorsDict[errTitle().state]" class="py-2 text-sm">
            {{ errTitle().msg }}
          </p>
        </div>
      </section>

      <!-- body -->
      <section class="md:flex">
        <label
          class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
          for="body"
          >内容説明</label
        >
        <div class="md:w-5/6">
          <textarea
            id="body"
            v-model="post.body"
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
          <p :class="msgColorsDict[errBody().state]" class="py-2 text-sm">
            {{ errBody().msg }}
          </p>
        </div>
      </section>

      <!-- downloadUrl -->
      <section class="md:flex">
        <label
          class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
          for="download-url"
          >URL (少なくとも一方の URL が必要)</label
        >
        <div class="md:w-5/6">
          <p class="text-sm text-gray-600">Download URL</p>
          <input
            type="text"
            id="download-url"
            v-model="post.downloadUrl"
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
          <p
            :class="
              msgColorsDict[
                errUrlPattern(post.downloadUrl, 'downloadUrl').state
              ]
            "
            class="pb-2 text-sm"
          >
            {{ errUrlPattern(post.downloadUrl, "downloadUrl").msg }}
          </p>
        </div>
      </section>
      <section class="md:flex">
        <label
          class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left"
          for="play-url"
        ></label>
        <div class="md:w-5/6">
          <p class="text-sm text-gray-600">Play URL</p>
          <input
            type="text"
            id="play-url"
            v-model="post.playUrl"
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
          <p
            :class="msgColorsDict[errUrlPattern(post.playUrl, 'playUrl').state]"
            class="pb-2 text-sm"
          >
            {{ errUrlPattern(post.playUrl, "playUrl").msg }}
          </p>
          <!-- 少なくとも一方 -->
          <p :class="msgColorsDict[errUrls().state]" class="py-2 text-sm">
            {{ errUrls().msg }}
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
              v-model="post.genre"
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
              v-model="post.supportedEnvs"
            />
            <label
              :for="env"
              :class="[
                colorsDict[envsDict[env].color].textClass,
                colorsDict[envsDict[env].color].bgClass,
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
          <p
            :class="msgColorsDict[errSupportedEnvs().state]"
            class="py-2 text-sm"
          >
            {{ errSupportedEnvs().msg }}
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
              v-model="post.authors"
            />
            <label
              :for="athr"
              class="mr-1 flex flex-row items-center text-sm text-gray-800"
              ><img :src="val.icon" class="h-8 w-8 rounded-full" />
              <p class="mx-1">{{ val.name }}({{ val.year }})</p></label
            >
          </div>
          <p :class="msgColorsDict[errAuthors().state]" class="py-2 text-sm">
            {{ errAuthors().msg }}
          </p>
        </div>
      </section>

      <!-- picDetails -->
      <section class="md:flex">
        <div class="pr-4 md:w-1/6 block text-gray-600 font-bold md:text-left">
          画像 (1 枚～, 16:9 にトリミングされる, 高圧縮な .webp がお薦め)
        </div>
        <div class="md:w-5/6">
          <input
            type="file"
            accept=".webp, .png, .jpg, .jpeg"
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
                <img
                  class="mx-2 h-30 aspect-video bg-white object-cover"
                  :src="detail.base64"
                />
                <span v-if="detail.pic" class="py-2 text-sm text-stone-800"
                  >OK: Already posted</span
                >
                <span
                  v-else-if="parseInt(detail.bytes.size) > maxBytes"
                  class="py-2 text-sm text-red-600"
                  >NG: {{ parseBytes(parseInt(detail.bytes.size)) }} &gt;
                  {{ parseBytes(maxBytes) }}</span
                >
                <span v-else class="py-2 text-sm text-stone-800"
                  >OK: {{ parseBytes(parseInt(detail.bytes.size)) }} &lt;=
                  {{ parseBytes(maxBytes) }}</span
                >
                <button
                  :class="colorsDict[genresDict[post.genre].color].buttonClass"
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
                  Remove
                </button>
              </div>
            </div>
          </div>
          <p :class="msgColorsDict[errPics().state]" class="py-2 text-sm">
            {{ errPics().msg }}
          </p>
        </div>
      </section>

      <!-- Update -->
      <section class="py-1 md:flex md:items-center">
        <div class="md:w-1/6"></div>
        <div class="md:w-auto">
          <button
            :class="
              colorsDict[
                updateErrIfAny().state === 'ok'
                  ? genresDict[post.genre].color
                  : 'gray'
              ].buttonClass
            "
            class="px-4 py-2 focus:outline-none text-white font-bold rounded"
            type="button"
            @click="updatePost()"
          >
            Update
          </button>
          <span
            :class="msgColorsDict[updateErrIfAny().state]"
            class="ml-3 text-sm"
            >{{ updateErrIfAny().msg }}</span
          >
        </div>
      </section>

      <!-- info -->
      <p v-if="post.title" class="py-2">
        ・この投稿は
        <a
          rel="noopener"
          :href="`https://rvw2022.herokuapp.com/posts/${post.title}`"
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
          https://rvw2022.herokuapp.com/posts/{{ post.title }}</a
        >
        にて公開中です。
      </p>

      <!-- 水平線 -->
      <div class="border-t border-stone-800"></div>

      <!-- info -->
      <p :class="msgColorsDict['ng']" class="py-2 truncate">
        {{ "--- Danger Zone ".repeat(12) }}
      </p>

      <!-- DELETE -->
      <section class="py-1 md:flex md:items-center">
        <div class="md:w-1/6"></div>
        <div class="md:w-auto">
          <button
            :class="
              colorsDict[
                deleteErrIfAny().state === 'ok'
                  ? genresDict[post.genre].color
                  : 'gray'
              ].buttonClass
            "
            class="px-4 py-2 focus:outline-none text-white font-bold rounded"
            type="button"
            @click="deletePost()"
          >
            DELETE
          </button>
          <span
            :class="msgColorsDict[deleteErrIfAny().state]"
            class="ml-3 text-sm"
            >{{ deleteErrIfAny().msg }}</span
          >
        </div>
      </section>

      <!-- 水平線 -->
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
          >{{ JSON.stringify(getCurPost()) }}</span
        >
      </p>
    </form>
  </div>
</template>

<script>
// https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
import { db, storage } from "~/plugins/firebase.js";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  listAll,
  deleteObject,
} from "firebase/storage";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

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
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// regexp の pattern のオプションフラグについて。
// /<PAT>/g: global search。
//        一度マッチしても終了せず、複数個マッチ。
// /<PAT>/m: 複数行の時、各行に対して ^, $ がマッチする
// /<PAT>/u: unicode (漢字など) 対応
const urlPattern = /^https?:\/\/.*$/u;

export default {
  data() {
    return {
      // watch 用
      postId: null,
      // Submit 用
      googleDriveFileId: "",
      post: {
        title: "",
        postId: "",
        body: "",
        downloadUrl: "",
        playUrl: "",
        genre: "puzzle",
        supportedEnvs: [],
        authors: [],
        pics: [],
      },
      // for internal system
      picDetails: [],
      maxBytes: 512 * 1024, // 512 KB 以下
      updateMsg: null,
      deleteMsg: null,
      // define
      genresDict,
      authorsDict,
      colorsDict,
      envsDict,
      msgColorsDict: {
        ok: "text-gray-600",
        wip: "text-sky-600",
        warn: "text-yellow-600",
        ng: "text-red-600",
      },
    };
  },
  head() {
    const TITLE = "更新";
    const DESC = "部員用の更新ページです。";
    return {
      // <title> を設定
      title: TITLE,
      meta: [
        // 検索結果に表示させない https://nishimura.club/nuxt-noindex
        { hid: "robots", name: "robots", content: "noindex" },
        // og の方の title
        {
          hid: "og:title",
          property: "og:title",
          content: TITLE,
        },
        // og 画像はなし
        { hid: "og:image" },
        {
          hid: "og:description",
          property: "og:description",
          content: DESC,
        },
        {
          hid: "description",
          name: "description",
          content: DESC,
        },
      ],
    };
  },
  computed: {
    postGenresDict() {
      return this.$store.getters["posts/getPostGenresDict"];
    },
    postIdsDict() {
      return this.$store.getters["posts/getPostIdsDict"];
    },
  },
  mounted() {
    // for (let key in dict) {}
    for (let genre in this.genresDict) {
      // for (let x of array) {}
      for (let postId of this.postGenresDict[genre]) {
        this.postId = postId;
        break;
      }
      if (this.postId) break;
    }
  },
  methods: {
    parseBytes(b) {
      if (!b) b = 0;
      const units = ["bytes", "KB", "MB", "GB"];
      let i = 0;
      for (; i < units.length; i++) {
        if (b < 1024) break;
        b /= 1024;
      }
      b = Math.floor(b);
      return `${b} ${units[i]}`;
    },
    errTitle() {
      if (this.post.title.length) {
        for (const [curPostId, curPost] of Object.entries(this.postIdsDict)) {
          if (
            !curPostId &&
            curPost.title === this.post.title &&
            curPostId !== this.postId
          ) {
            return {
              state: "ng",
              msg: "NG: 入力された self.title は既に存在します。",
            };
          }
        }
        return {
          state: "ok",
          msg: "OK: len(self.title) > 0",
        };
      }
      return {
        state: "ng",
        msg: "NG: len(self.title) == 0",
      };
    },
    errBody() {
      if (this.post.body.length) {
        return {
          state: "ok",
          msg: "OK: len(self.body) > 0",
        };
      }
      return {
        state: "ng",
        msg: "NG: len(self.body) == 0",
      };
    },
    errUrlPattern(url, str) {
      if (url === "") {
        return {
          state: "ok",
          msg: `OK: self.${str} は設定されません。`,
        };
      }
      if (urlPattern.test(url)) {
        if (str === "downloadUrl") {
          return {
            state: "ok",
            msg: `OK: re.match("https?://.*", self.${str}) != None, self.googleDriveFileId == "${this.googleDriveFileId}"`,
          };
        }
        return {
          state: "ok",
          msg: `OK: re.match("https?://.*", self.${str}) != None`,
        };
      }
      return {
        state: "ng",
        msg: `NG: re.match("https?://.*", self.${str}) == None`,
      };
    },
    errUrls() {
      let empty = [this.post.downloadUrl === "", this.post.playUrl === ""];
      if (!empty[0] && !urlPattern.test(this.post.downloadUrl)) {
        return {
          state: "ng",
          msg: "NG: self.downloadUrl を修正してください。",
        };
      }
      if (!empty[1] && !urlPattern.test(this.post.playUrl)) {
        return {
          state: "ng",
          msg: "NG: self.playUrl を修正してください。",
        };
      }
      if (empty[0]) {
        if (empty[1]) {
          return {
            state: "ng",
            msg: "NG: self.downloadUrl, self.playUrl の少なくとも一方を設定してください。",
          };
        } else {
          return {
            state: "ok",
            msg: "OK: self.playUrl が設定されます。",
          };
        }
      } else {
        if (empty[1]) {
          return {
            state: "ok",
            msg: "OK: self.downloadUrl が設定されます。",
          };
        } else {
          return {
            state: "ok",
            msg: "OK: self.downloadUrl, self.playUrl が設定されます。",
          };
        }
      }
    },
    errSupportedEnvs() {
      if (this.post.supportedEnvs.length) {
        const envs = Object.keys(this.envsDict);
        let supEnvs = [];
        envs.forEach((env) => {
          const valid = this.post.supportedEnvs.some(
            (supEnv) => supEnv === env
          );
          if (valid) supEnvs.push(env);
        });
        return {
          state: "ok",
          msg: supEnvs.map((env) => this.envsDict[env].aka).join(", "),
        };
      }
      return {
        state: "ng",
        msg: "NG: len(self.supportedEnvs) == 0",
      };
    },
    errAuthors() {
      if (this.post.authors.length) {
        return {
          state: "ok",
          msg: `OK: ${this.post.authors.map((athr) => authorsDict[athr].name)}`,
        };
      }
      return {
        state: "ng",
        msg: "NG: len(self.authors) == 0",
      };
    },
    errPics() {
      if (this.picDetails.length === 0) {
        return {
          state: "ng",
          msg: "NG: len(self.pics) == 0",
        };
      }
      for (let i = 0; i < this.picDetails.length; i++) {
        const { bytes } = this.picDetails[i];
        if (parseInt(bytes.size) > this.maxBytes) {
          return {
            state: "ng",
            msg: `pics[${i}]: ${this.parseBytes(
              parseInt(bytes.size)
            )} > ${this.parseBytes(this.maxBytes)}`,
          };
        }
      }
      return {
        state: "ok",
        msg: `OK: len(self.pics) == ${this.picDetails.length}`,
      };
    },
    updateErrIfAny() {
      if (!this.post) {
        return {
          state: "ng",
          msg: "ページ上部「更新したい記事」にて、記事を選択してください。",
        };
      }
      if (this.updateMsg) {
        return {
          state: "wip",
          msg: this.updateMsg,
        };
      }
      const funcs = [
        this.errTitle,
        this.errBody,
        this.errUrls,
        this.errSupportedEnvs,
        this.errAuthors,
        this.errPics,
      ];
      for (let i = 0; i < funcs.length; i++) {
        const msg = funcs[i]();
        if (msg.state === "ng") {
          return {
            state: msg.state,
            msg: msg.msg,
          };
        }
      }
      return {
        state: "ok",
        msg: "OK",
      };
    },
    deleteErrIfAny() {
      if (!this.post) {
        return {
          state: "ng",
          msg: "ページ上部「更新したい記事」にて、記事を選択してください。",
        };
      }
      if (this.deleteMsg) {
        return {
          state: "wip",
          msg: this.deleteMsg,
        };
      }
      return {
        state: "ok",
        msg: "OK",
      };
    },
    addPics(ev) {
      const files = ev.target.files;
      const curLen = this.picDetails.length;
      for (let i = 0; i < files.length; i++) {
        if (!files[i]) {
          console.warn(`files[${i}] == null`);
          continue;
        }
        this.picDetails.push({
          bytes: files[i],
          // http://www.openspc2.org/reibun/javascript2/FileAPI/files/0002/index.html
          ext: files[i].name.replace(/.*\./u, "."),
          // https://qiita.com/CloudRemix/items/92e68a048a0da93ed240
          base64:
            "data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7",
          pic: null,
        });

        // https://okinawanpizza.hatenablog.com/entry/2020/12/29/120807
        // 入力画像を base64 化する。この画像はユーザーに見せるようであり、
        // Upload するのは生データ (bytes) の方
        const rd = new FileReader();
        rd.onload = (evRd) =>
          (this.picDetails[i + curLen].base64 = evRd.target.result);
        rd.readAsDataURL(files[i]); // base64 埋め込み
      }
    },
    dumpPic(idx) {
      // splice https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array
      this.picDetails.splice(idx, 1);
    },
    getCurPost() {
      let curPost = deepCopy(this.post);

      // 1. downloadUrl に関しては
      // from: https://drive.google.com/file/d/1T_vXIz1xjKJSPLlnc7tZYTtd7F7a0isk/view?usp=sharing
      // to: https://drive.google.com/uc?export=download&id=1T_vXIz1xjKJSPLlnc7tZYTtd7F7a0isk
      // 2. playUrl に関してはそのままです
      const introns = [/\/view.*/u, /.*[\/=]/u];
      if (curPost.downloadUrl.startsWith("https://drive.google.com")) {
        let googleDriveFileId = curPost.downloadUrl;
        introns.forEach((s) => {
          googleDriveFileId = googleDriveFileId.replace(s, "");
        });
        if (googleDriveFileId) {
          curPost.downloadUrl = `https://drive.google.com/uc?id=${googleDriveFileId}`;
          this.googleDriveFileId = googleDriveFileId;
        }
      }

      // postId
      curPost.postId = this.postId;

      // pics
      curPost.pics = this.picDetails.map((detail) => {
        if (detail.pic) return detail.pic;
        return "<Ungenerated URL>";
      });

      // supportedEnvs
      curPost.supportedEnvs = [];
      const envs = Object.keys(envsDict);
      envs.forEach((env) => {
        const valid = this.post.supportedEnvs.some((supEnv) => supEnv === env);
        if (valid) curPost.supportedEnvs.push(env);
      });

      // updatedTime
      const dt = new Date();
      const func = (x) => ("00" + x).slice(-2);
      const updatedTime = `${dt.getFullYear()}/${
        dt.getMonth() + 1
      }/${dt.getDate()} ${func(dt.getHours())}:${func(dt.getMinutes())}`;
      curPost.updatedTime = updatedTime;

      return curPost;
    },
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
    // https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
    async updatePost() {
      const msg = this.updateErrIfAny();
      if (msg.state !== "ok") {
        alert(msg.msg);
        return;
      }
      {
        // firestore は 1 GB で、クエリ処理が速い
        // firestore/redirects/<title>/ に json を送信
        this.updateMsg = `PUT: firestore/redirects/${this.post.title}`;
        const docRef = doc(db, "redirects", this.post.title);
        try {
          const redirect = { redirect: this.postId };
          await setDoc(docRef, redirect);
        } catch (e) {
          console.error("(updatePost, redirects) Error");
          console.error(e);
          return;
        }
      }
      // storage は 10 GB で、クエリ処理が遅い
      // storage/posts/<postId>/ に画像群を送信
      let post = this.getCurPost();
      // 長さ this.picDetails.length の空配列
      post.pics = Array(this.picDetails.length);
      for (let i = 0; i < this.picDetails.length; i++) {
        const { bytes, ext, pic } = this.picDetails[i];
        if (pic) {
          post.pics[i] = pic;
          continue;
        }
        const picName = getRandom() + ext;
        this.submitMsg = `PUT: storage/posts/${post.postId}/${picName}`;
        const storageRef = ref(storage, `${post.postId}/${picName}`);
        await uploadBytes(storageRef, bytes).then(async (snapshot) => {
          post.pics[i] = await getDownloadURL(snapshot.ref);
        });
      }
      this.post.pics = post.pics;
      // firestore/posts/<postId>/ に json を送信
      this.updateMsg = `PUT: firestore/posts/${this.postId}`;
      const docRef = doc(db, "posts", this.postId);
      try {
        await setDoc(docRef, post);
        console.log("(submit, updatePost, posts) Success");
        this.updateMsg = "Updated!";
        setTimeout(() => (this.updateMsg = null), 1000);
      } catch (e) {
        console.error("(submit, updatePost, posts) Error");
        console.error(e);
        return;
      }
    },
    // firestore https://firebase.google.com/docs/firestore/manage-data/delete-data
    // firebase storage https://firebase.google.com/docs/storage/web/delete-files
    async deletePost() {
      if (!this.postId) {
        alert("ページ上部「更新したい記事」にて、記事を選択してください。");
        return;
      }
      const err = this.deleteErrIfAny();
      if (err.state !== "ok") {
        alert(err.msg);
        return;
      }
      this.updateMsg = "This post will be deleted.";
      {
        const docRef1 = doc(db, "redirects", this.post.title);
        const docRef2 = doc(db, "posts", this.postId);
        try {
          this.deleteMsg = `DELETE: firestore/redirects/${this.post.title}`;
          await deleteDoc(docRef1);
          this.deleteMsg = `DELETE: firestore/posts/${this.postId}`;
          await deleteDoc(docRef2);
          const storageRef = ref(storage, this.postId);
          await listAll(storageRef).then((res) => {
            res.items.forEach((itemRef) => {
              this.deleteMsg = `DELETE: storage/${this.postId}/${itemRef.name}`;
              deleteObject(itemRef);
            });
          });
        } catch (e) {
          console.error("(deletePost, redirects) Error");
          console.error(e);
          return;
        }
      }
      this.updateMsg = "Deleted! Press F5 to refresh.";
      this.deleteMsg = "Deleted! Press F5 to refresh.";
    },
    getPostById(id) {
      return this.$store.getters["posts/getPostById"](id);
    },
  },
  watch: {
    postId: {
      immediate: true,
      handler(postId) {
        if (!postId) return;
        this.post = deepCopy(this.postIdsDict[postId]);
        this.picDetails = this.post.pics.map((pic) => {
          return {
            bytes:
              "data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7",
            ext: "",
            base64: pic,
            pic: pic,
          };
        });
      },
    },
  },
  // async asyncData({ error }) {
  //   // firestore/posts/<postId>/ を見て this.postIdsDict を生成
  //   let postIdsDict = {};
  //   const docRef = collection(db, "posts");
  //   let postId = null;
  //   try {
  //     const documents = await getDocs(docRef);
  //     if (!documents) {
  //       console.warn("(update, asyncData) Invalid");
  //       return;
  //     }
  //     documents.forEach((document) => {
  //       postIdsDict[document.id] = document.data();
  //       if (!postId) postId = document.id;
  //     });
  //   } catch (e) {
  //     console.warn("(update, asyncData) Error");
  //     console.warn(e);
  //     error({
  //       statusCode: 500,
  //       message: "Fatal error",
  //     });
  //   }
  //   return { postId, postIdsDict };
  // },
};
</script>
