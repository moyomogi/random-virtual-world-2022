[![hp](https://raw.githubusercontent.com/moyomogi/vuetest/master/docs/hp.svg)](https://vuetest-103b3.web.app)
[![deploy](https://github.com/moyomogi/vuetest/actions/workflows/deploy-on-merge.yml/badge.svg)](https://github.com/moyomogi/vuetest/actions/workflows/deploy-on-merge.yml)
[![last-commit](https://img.shields.io/github/last-commit/moyomogi/vuetest)](https://github.com/moyomogi/vuetest/commits/master)
[![license](https://img.shields.io/badge/license-CC0-blue)](https://creativecommons.org/publicdomain/zero/1.0/deed.ja)

# 🌸 Vue test
<img src="https://i.imgur.com/R9YV2YX.png" width="180">  

## インストール
WSL の上で作業してください。  
まず `Code > Download ZIP` から DL してカレントフォルダに置いてください。その後、下記コマンドを実行してください。  
```sh
# ./package.json の "dependencies", "devDependencies" にあるコマンドをインストール
npm install
```

## Firebase にログイン
詳しくは [Firebaseでデプロイしよう！](https://qiita.com/hiroki-harada/items/ca22ac177db68e3c3796) を参照。
# 初期化
```sh
npm install -g firebase-tools
firebase login
firebase init
```

## localhost にサーブする方法

### 開発モードでサーブ
[localhost:3000](http://localhost:3000) にてサーブされる。
```sh
# ./package.json の "scripts" の "dev" にあるコマンドを実行せよ、の意
npm run dev
```

### 製品モードでサーブ
[localhost:3000](http://localhost:3000) にてサーブされる。
```sh
# dist フォルダにファイル群を生成
npm run generate
# localhost にてサーブする
npm run start
```

## 技術スタック
- [NuxtJS](https://nuxtjs.org/ja/docs/get-started/installation/)

- [Tailwind CSS](https://tailwindcss.com/docs/installation)
  `/` キーを押すと、クラスを検索できます。

- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org)

- [Firebase](https://firebase.google.com/)

- [vue-awesome-swiper](https://github.surmon.me/vue-awesome-swiper/)
  スライドショー機能

## 参考文献
- [Making a Navigation Drawer/Sliding Sidebar with TailwindCSS](https://dev.to/fayaz/making-a-navigation-drawer-sliding-sidebar-with-tailwindcss-blueprint-581l)
  THeNavbar.vue で使いました。

- [Multi Section Form | Tailwind Toolbox](https://www.tailwindtoolbox.com/templates/multi-section-form)
  submit.vue で使いました。

- [Tailblocks](https://tailblocks.cc)
