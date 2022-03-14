// グローバル定数
// https://devsakaso.com/vue-js-img-in-assets/
// v-bind したい画像は assets でなく static に置く
const genresDict = {
  puzzle: {
    aka: "パズル",
    color: "cyan",
    genreUrl: "/slides/genre_puzzle.webp",
  },
  role_playing: {
    aka: "RPG",
    color: "yellow",
    genreUrl: "/slides/genre_role_playing.webp",
  },
  action: {
    aka: "アクション",
    color: "magenta",
    genreUrl: "/slides/genre_action.webp",
  },
  shooting: {
    aka: "シューティング",
    color: "cyan",
    genreUrl: "/slides/genre_shooting.webp",
  },
  desttop_music: {
    aka: "DTM",
    color: "yellow",
    genreUrl: "/slides/genre_desktop_music.webp",
  },
  etcetera: {
    aka: "その他",
    color: "magenta",
    genreUrl: "/slides/genre_etcetera.webp",
  },
  illustration: {
    aka: "イラスト",
    color: "cyan",
    genreUrl: "/slides/genre_illustration.webp",
  },
};
export { genresDict };

const authorsDict = {
  frqrp721: {
    year: 1,
    name: "kono",
    icon: "https://ch-random.net/authors/frqrp721/avatar_hub68cdfec13049c09afd87f893a304dd5_1987558_250x250_fill_lanczos_center_2.png",
  },
  hasshi1647: {
    year: 1,
    name: "はっしー",
    icon: "https://ch-random.net/authors/hasshi1647/avatar_hubc2df5808fcc02221fb63d429e585865_35897_250x250_fill_q90_lanczos_center.jpg",
  },
  kyototakadayuki: {
    year: 1,
    name: "datti",
    icon: "https://ch-random.net/authors/kyototakadayuki/avatar_huaa48e5e043d9077403bf30a47dde1d4e_109748_250x250_fill_q90_lanczos_center.jpg",
  },
  m1ka: {
    year: 1,
    name: "みか",
    icon: "https://ch-random.net/authors/m1ka/avatar_hu63c37736564723d17023a4c02c01406e_1742_250x250_fill_lanczos_center.gif",
  },
  rkks: {
    year: 1,
    name: "ここなさ",
    icon: "https://ch-random.net/authors/rkks/avatar_hu78c3f7085595d18b79b23d3c7a6d8fca_13152_250x250_fill_lanczos_center_2.png",
  },
  ryo_ma2t: {
    year: 1,
    name: "Rikky",
    icon: "https://ch-random.net/authors/ryo_ma2t/avatar_huba15ccc1859ac4f78c24e070574bf6db_1571577_250x250_fill_q90_lanczos_center.jpg",
  },
  yomog: {
    year: 1,
    name: "よもぎ",
    icon: "https://ch-random.net/authors/yomog/avatar_hue523f5c0a45e10cf0e33f8e085b52548_162276_250x250_fill_lanczos_center_2.png",
  },
  yoshisaurus: {
    year: 1,
    name: "ヨッシー",
    icon: "https://ch-random.net/authors/yoshisaurus/avatar_hue83d6e1cfa3a02820acf03ed5c009497_56465_250x250_fill_lanczos_center_2.png",
  },
  utaoro: {
    year: 2,
    name: "うっかり侍",
    icon: "https://ch-random.net/authors/utaoro/avatar_hub3e0b43c4b3f17b50e92ac9473e8630e_1050_250x250_fill_lanczos_center_2.png",
  },
  kumaizasa: {
    year: 2,
    name: "クマイザサ",
    icon: "https://ch-random.net/authors/kumaizasa/avatar_hu64d85e260a17aadcbf30bbce49b6948c_24638_250x250_fill_q90_lanczos_center.jpg",
  },
  maharaja_: {
    year: 2,
    name: "まはらじゃ",
    icon: "https://ch-random.net/authors/maharaja_/avatar_hud943b22f55fc153ab1b9b1dda0d5cac3_9454_250x250_fill_q90_lanczos_center.jpg",
  },
  bacon_: {
    year: 2,
    name: "はむ",
    icon: "https://ch-random.net/authors/bacon_/avatar_hu555092a897d4f0fa020169414e0aa6bf_30387_250x250_fill_q90_lanczos_center.jpg",
  },
  gepard: {
    year: 2,
    name: "マンション",
    icon: "https://ch-random.net/authors/gepard/avatar_hu66060d98256bf889d26472521a0d2329_207316_250x250_fill_lanczos_center_2.png",
  },
  neuron_11235: {
    year: 2,
    name: "neuron",
    icon: "https://ch-random.net/authors/neuron_11235/avatar_hua66195a5ab94a27b0befa0f26c13b35f_3259_250x250_fill_lanczos_center_2.png",
  },
  namiking: {
    year: 2,
    name: "なみキング",
    icon: "https://ch-random.net/authors/namiking/avatar_huf7a7d35dd4a3e500111b4ecd6a079830_81540_250x250_fill_lanczos_center_2.png",
  },
  n_itsuki: {
    year: 2,
    name: "n_itsuki",
    icon: "https://ch-random.net/authors/n_itsuki/avatar_hu165d2f72e03afb36269fd92d358c7844_1950816_250x250_fill_q90_lanczos_center.jpg",
  },
  ryo_2: {
    year: 2,
    name: "RYO_2",
    icon: "https://ch-random.net/authors/ryo_2/avatar_hu3b93192ef15555c1cb8e24fbea7a8fea_1053030_250x250_fill_lanczos_center_2.png",
  },
  yata_pngn: {
    year: 2,
    name: "やたぺんぎん",
    icon: "https://ch-random.net/authors/yata_pngn/avatar_hu65451352b92d3f6695ab1a05b58d8c2a_279244_250x250_fill_lanczos_center_2.png",
  },
  petrichor256: {
    year: 2,
    name: "ぺとりこーる",
    icon: "https://ch-random.net/authors/petrichor256/avatar_hua12e48c0e56ced3835f52753c2ac6c96_74434_250x250_fill_q90_lanczos_center.jpg",
  },
  tomos: {
    year: 2,
    name: "とも",
    icon: "https://ch-random.net/authors/tomos/avatar_hu9dbd234177a4e766039873b8c8ef68eb_23354_250x250_fill_q90_lanczos_center.jpg",
  },
  yoshiya: {
    year: 2,
    name: "よしや",
    icon: "https://ch-random.net/authors/yoshiya/avatar_huaeafca71c519851c711d6b7cfbd32ebf_6054_250x250_fill_lanczos_center_2.png",
  },
  citron0201: {
    year: 2,
    name: "Citron0201",
    icon: "https://ch-random.net/authors/citron0201/avatar_hu567ad3c1740929108297db979d3964a0_36948_250x250_fill_lanczos_center_2.png",
  },
  kwang: {
    year: 2,
    name: "Kwang",
    icon: "https://ch-random.net/authors/kwang/avatar_hu81c97084eb3b4ce5d80495e887234131_90422_250x250_fill_lanczos_center_2.png",
  },
  v01d: {
    year: 2,
    name: "V0!d",
    icon: "https://ch-random.net/authors/v01d/avatar_hu7a1c2541a1e9cb9798aa537672282d0e_142235_250x250_fill_q90_lanczos_center.jpg",
  },
  haniwa0404: {
    year: 3,
    name: "Haniwa",
    icon: "https://ch-random.net/authors/haniwa0404/avatar_hudb18bcc104b941522a14f770e00c3fae_673_250x250_fill_lanczos_center_2.png",
  },
  marcus_o00: {
    year: 3,
    name: "Marcus",
    icon: "https://ch-random.net/authors/marcus_o00/avatar_hua6e04c0fb462bf9aa4c7efa51f6a5ae0_1702_250x250_fill_lanczos_center_2.png",
  },
  tan_wave: {
    year: 3,
    name: "tan_wave",
    icon: "https://ch-random.net/authors/tan_wave/avatar_hu932429aedb220d86b691fc1ec0ddc659_434607_250x250_fill_lanczos_center_2.png",
  },
  nnskn: {
    year: 3,
    name: "nnskn",
    icon: "https://ch-random.net/authors/nnskn/avatar_hu38af59f9a1224e5cee349b9b95525c87_862309_250x250_fill_lanczos_center_2.png",
  },
  saber: {
    year: 3,
    name: "otawa",
    icon: "https://ch-random.net/authors/saber/avatar_hu1cd73694399d0eb9c74cc23f87cb5422_5229_250x250_fill_lanczos_center_2.png",
  },
  iwankf: {
    year: 3,
    name: "IWANK",
    icon: "https://ch-random.net/authors/iwankf/avatar_hu60624f0e290ef050c506f63a4ab799f3_99850_250x250_fill_q90_lanczos_center.jpg",
  },
  rik_tomaki: {
    year: 3,
    name: "IK",
    icon: "https://ch-random.net/authors/rik_tomaki/avatar_huf6f1b39d6f89ba900c0997fcc59a1f5b_53313_250x250_fill_lanczos_center_2.png",
  },
  amiimoimo: {
    year: 3,
    name: "あみお",
    icon: "https://ch-random.net/authors/amiimoimo/avatar_hubbe830813a2b9f25bfa2465abecee624_101436_250x250_fill_lanczos_center_2.png",
  },
  srniyko: {
    year: 3,
    name: "srniyko",
    icon: "https://ch-random.net/authors/srniyko/avatar_hu124ad365bdd5b0db546ae9961b0a0070_1961412_250x250_fill_q90_lanczos_center.jpg",
  },
  ryo: {
    year: 3,
    name: "Ryo",
    icon: "https://ch-random.net/authors/ryo/avatar_hu8afff36566b7f9bf15d6f2d9a84fd7b5_194088_250x250_fill_q90_lanczos_center.jpg",
  },
  kazetta: {
    year: 3,
    name: "kazetta",
    icon: "https://ch-random.net/authors/kazetta/avatar_hub3e0b43c4b3f17b50e92ac9473e8630e_1050_250x250_fill_lanczos_center_2.png",
  },
  be2211910: {
    year: 3,
    name: "ネオネギエレガント",
    icon: "https://ch-random.net/authors/be2211910/avatar_hu49c86a9a4ec0180fb9db8618a94c82ec_467_250x250_fill_lanczos_center_2.png",
  },
  kenya525: {
    year: 3,
    name: "Kenya",
    icon: "https://ch-random.net/authors/kenya525/avatar_hub3e0b43c4b3f17b50e92ac9473e8630e_1050_250x250_fill_lanczos_center_2.png",
  },
  yukarion: {
    year: 3,
    name: "Yukarion",
    icon: "https://ch-random.net/authors/yukarion/avatar_hu028f66402b8a27a7bb5b439c6e862da9_24687_250x250_fill_lanczos_center_2.png",
  },
};
export { authorsDict };

const colorsDict = {
  magenta: {
    textClass: "text-pink-800",
    bgClass: "bg-pink-200",
    borderClass: "border-pink-400",
    shadowClass: "shadow-pink-500/60",
    buttonClass: ["focus:bg-pink-500", "bg-pink-600", "hover:bg-pink-700"],
  },
  cyan: {
    textClass: "text-sky-800",
    bgClass: "bg-sky-200",
    borderClass: "border-sky-400",
    shadowClass: "shadow-sky-500/60",
    buttonClass: ["focus:bg-sky-500", "bg-sky-600", "hover:bg-sky-700"],
  },
  yellow: {
    textClass: "text-yellow-800",
    bgClass: "bg-yellow-200",
    borderClass: "border-yellow-400",
    shadowClass: "shadow-yellow-500/60",
    buttonClass: [
      "focus:bg-yellow-500",
      "bg-yellow-600",
      "hover:bg-yellow-700",
    ],
  },
  gray: {
    textClass: "text-stone-100",
    bgClass: "bg-stone-600",
    borderClass: "border-stone-400",
    buttonClass: ["focus:bg-stone-500", "bg-stone-600", "hover:bg-stone-700"],
  },
  random: {
    textClass: "text-rose-800",
    bgClass: "bg-rose-200",
    borderClass: "border-rose-400",
    shadowClass: "shadow-rose-500/60",
    buttonClass: ["focus:bg-rose-600", "bg-rose-700", "hover:bg-rose-800"],
  },
};
export { colorsDict };

const envsDict = {
  windows: {
    aka: "Windows",
    color: "magenta",
  },
  mac: {
    aka: "Mac OS",
    color: "cyan",
  },
  browser: {
    aka: "ブラウザ",
    color: "yellow",
  },
};
export { envsDict };
