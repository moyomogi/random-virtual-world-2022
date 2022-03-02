<template>
  <div>
    <TheHeader />
    <div
      class="my-bg antialiased flex flex-col"
    >
      <TheSlides />
      <iframe
        class="
          mx-auto
          md:flex
          items-conter
          mb-8
          md:w-1/2
          aspect-video
          rounded-xl
          overflow-hidden
        "
        src="https://www.youtube-nocookie.com/embed/_8rk_af6ApM"
        allow="accelerometer;clipboard-write;encrypted-media;gyroscope"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
/* https://reactgo.com/nuxt-set-background-image/
assets 内の画像は style に置く必要がある */
.my-bg {
  background-image: url("~assets/bg.jpg");
}
</style>
