[![hp](https://raw.githubusercontent.com/moyomogi/vuetest/master/docs/hp.svg)](https://vuetest-103b3.firebaseapp.com)
[![deploy](https://github.com/moyomogi/vuetest/actions/workflows/deploy-on-merge.yml/badge.svg)](https://github.com/moyomogi/vuetest/actions/workflows/deploy-on-merge.yml)
[![last-commit](https://img.shields.io/github/last-commit/moyomogi/vuetest)](https://github.com/moyomogi/vuetest/commits/master)

# 🌸 Vue test
<img src="https://i.imgur.com/R9YV2YX.png" width="180">  

## インストール
WSL の上で作業してください。  
まず `Code > Download ZIP` から DL してカレントフォルダに置いてください。その後、下記コマンドを実行してください。  
```sh
# ./package.json の "dependencies", "devDependencies" にあるコマンドをインストール
npm install
```

## 開発モードで localhost にサーブする方法
[localhost:3000](http://localhost:3000) にてサーブされる。
```sh
# ./package.json の "scripts" の "dev" にあるコマンドを実行せよ、の意
npm run dev
```

## 製品モードで localhost にサーブする方法
以下のコマンドは等価です。
1. [localhost:3000](http://localhost:3000) にてサーブされる。
```sh
# dist フォルダにファイル群を生成
npm run generate
# localhost にてサーブする
npm run start
```

2. [localhost:5000](http://localhost:5000) にてサーブされる。
```sh
npm run generate
# `npm run start` とほぼ等価
firebase serve --only hosting
```

## Firebase にデプロイ
```sh
npm run generate
# dist フォルダの中身をデプロイ
firebase deploy
```

## 技術スタック
- [NuxtJS](https://nuxtjs.org/ja/docs/get-started/installation/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org)
- [Firebase](https://firebase.google.com/)
- [vue-awesome-swiper](https://github.surmon.me/vue-awesome-swiper/)
