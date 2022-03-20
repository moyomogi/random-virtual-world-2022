<template>
  <!-- https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/vue/modals/large -->
  <!-- items-center -->
  <div
    v-if="open"
    class="
      fixed
      m-auto
      md:w-1/2
      h-auto
      inset-0
      z-50
      flex
      items-center
      justify-center
      outline-none
      focus:outline-none
      overflow-x-hidden overflow-y-auto
    "
  >
    <!-- flex-col -->
    <div
      class="
        relative
        h-auto
        w-full
        rounded-md
        shadow-md
        flex flex-col
        bg-stone-900
      "
    >
      <!--header-->
      <h3 class="flex text-white items-start p-5 text-3xl font-semibold">
        RVW 2022 Spring について
      </h3>
      <!--body-->
      <div class="mx-8 my-2 flex text-stone-100">
        Random Virtual World 2022 Spring
        は大阪府立大学の部活、コンピューターハウスランダムの作品展示企画です。中止になった
        2021 年度白鷺祭で展示予定だった作品 (ゲーム・音楽)
        を展示します。無料でダウンロード・ウェブ上でプレイできます。
      </div>
      <!--footer-->
      <div class="flex items-center justify-end pb-6 pr-6">
        <button
          class="
            text-stone-400
            bg-transparent
            border border-solid border-stone-400
            hover:bg-stone-400 hover:text-white
            active:bg-stone-600
            font-bold
            uppercase
            text-sm
            px-3
            py-2
            rounded
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: false,
  },
};
</script>
