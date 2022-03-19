// https://firebase.google.com/docs/storage/web/upload-files?hl=ja#web-version-9_1
// 公式解説を読むと最短で理解できる
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage, listAll } from "firebase/storage";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
const apps = getApps(); // 構築済み apps があれば格納
const firebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Firebase storage 全件列挙: listAll(ref(storage))
export { db, storage };
