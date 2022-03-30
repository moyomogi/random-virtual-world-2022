// Google Auth
// https://firebase.google.com/codelabs/firebase-web?index=..%2F..%2Findex#0
// https://note.com/aliz/n/nbda9579d979a
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  // signOut,
} from "firebase/auth";

export const state = () => ({
  userUid: "",
  userIcon: "data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7",
  userName: "",
});

// this.$store.getters["auth/FUNC"];
// 欲しいもの: userUid, userIcon, name
export const getters = {
  getUserUid(state) {
    return state.userUid;
  },
  getUserIcon(state) {
    return state.userIcon;
  },
  getUserName(state) {
    return state.userName;
  },
};

// this.$store.commit("auth/FUNC");
export const mutations = {
  update(state, { userUid, userIcon, userName }) {
    state.userUid = userUid;
    state.userIcon = userIcon;
    state.userName = userName;
  },
};

// this.$store.dispatch("auth/FUNC");
export const actions = {
  async signIn({ dispatch }) {
    // 一応もう一回起動
    dispatch("initFirebaseAuth");

    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
    } catch (e) {
      const popupPattern = /popup/;
      if (popupPattern.test(e.code)) {
        alert("このサイトの設定を開き、ポップアップを許可してください。");
      } else {
        alert(`code: ${e.code}\nmessage: ${e.message}`);
      }
    }
  },
  // signOutUser() {
  //   // Sign out of Firebase.
  //   signOut(getAuth());
  // },
  // 最初に一回だけ実行
  initFirebaseAuth({ commit }) {
    function authStateObserver(user) {
      if (user) {
        // User is signed in!
        // user = getAuth().currentUser;
        const userUid = user.uid || "";
        const userIcon =
          user.photoURL ||
          "data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7";
        const userName = user.displayName || "";
        // console.log("(authStateObserver) userUid");
        // console.log(userUid);
        commit("update", { userUid, userIcon, userName });
      } else {
        // User is signed out!
        // commit("initUid");
      }
    }
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  },
};
