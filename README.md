[![hp](https://raw.githubusercontent.com/moyomogi/rvw2022s/master/docs/hp.svg)](https://rvw2022s.herokuapp.com)
[![last-commit](https://img.shields.io/github/last-commit/moyomogi/rvw2022s)](https://github.com/moyomogi/rvw2022s/commits/master)
[![license](https://img.shields.io/badge/license-CC0-blue)](https://creativecommons.org/publicdomain/zero/1.0/deed.ja)

# Random Virtual World 2022 🌸
<img src="https://i.imgur.com/R9YV2YX.png" width="180">  

## インストール
WSL の上で作業してください。  
まず緑色の `Code > Download ZIP` から DL して、好きな場所に置いてください。その後、カレントフォルダで下記コマンドを実行してください。  
```sh
# ./package.json の "dependencies", "devDependencies" にあるコマンドをインストール
npm install
```

## localhost にサーブする方法
### 開発モードでサーブ
[localhost:3000](http://localhost:3000) にてサーブされる。
```sh
# ./package.json の "scripts" の "dev" にあるコマンドを実行せよ、の意
npm run dev
```

### 製品モード・Node.js hosting (Heroku など) モードでサーブ
[localhost:3000](http://localhost:3000) にてサーブされる。
Heroku にデプロイしているので、今回はこっち。
```sh
npm run build
npm run start
```

### (製品モード・Static hosting (GH Pages など) モードでサーブ)
[localhost:3000](http://localhost:3000) にてサーブされる。
```sh
# dist フォルダにファイル群を生成
npm run generate
# localhost にてサーブする
npm run start
```

## Firestore, Firebase Storage の設定
詳しくは [Firebaseでデプロイしよう！](https://qiita.com/hiroki-harada/items/ca22ac177db68e3c3796) を参照。
```sh
# `firebase` コマンドのインストール
npm install -g firebase-tools
# Firebase にログイン
firebase login
```

## Heroku にデプロイ
### 初回設定
アカウントを作った後、公式解説 [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) に従い、以下を実行。
```sh
heroku login
# `rvw2022s` は自分の Heroku プロジェクト名に変更してください
heroku git:remote -a rvw2022s
```

### 以降はこれを実行
```sh
git add --all
git commit -m "Test heroku"
git push heroku master  # Heroku にデプロイ
# git push origin master  # Github にデプロイ
```

## 技術スタック
- [NuxtJS](https://nuxtjs.org/ja/docs/get-started/installation/)
  Vue.js のフレームワーク
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
  `/` キーを押すと、クラスで検索できます。
- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org)
  NuxtJS アプリケーションに Tailwind CSS を手軽に導入できる。
- [Firebase](https://firebase.google.com/)
  Firestore, Firebase Storage を DB として使っています。
- [Heroku](https://jp.heroku.com/)
  Node.js hosting である Heroku でホスティングしています。
- [vue-awesome-swiper](https://web.archive.org/web/20211127071455/https://github.surmon.me/vue-awesome-swiper/)
  スライドショー機能

## 参考文献
- [Making a Navigation Drawer/Sliding Sidebar with TailwindCSS](https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l)
  `components/TheNavbar.vue` で使いました。
- [Multi Section Form | Tailwind Toolbox](https://www.tailwindtoolbox.com/templates/multi-section-form)
  `pages/submit.vue`, `pages/update.vue` で使いました。
- [Tailblocks](https://tailblocks.cc)
  `components/TheSlides.vue` で使いました。

## License
これらのコードは [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.ja) で許諾されています。すなわち、商用利用・非商用利用を問わず、引用元に記載せずに、これらのコードの一部または全部を使用できます。
