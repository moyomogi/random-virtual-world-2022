<template>
  <div>
    <TheHeader />
    <div
      class="antialiased md:flex md:flex-col bg-cover bg-repeat bg-center"
      style="background-image: url('/base/bg.jpg')"
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
          bg-gray-100
          border-2 border-gray
          rounded-lg
          overflow-hidden
        "
        src="https://www.youtube-nocookie.com/embed/_8rk_af6ApM" frameborder="0"
        allow="accelerometer;clipboard-write;encrypted-media;gyroscope"
      ></iframe>
    </div>
  </div>
</template>
