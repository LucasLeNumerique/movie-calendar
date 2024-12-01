<template>
    <div class="movie-card lg:h-[400px] pb-5 md:p-5 flex flex-col md:flex-row items-center gap-y-5 gap-x-7 text-center bg-zinc-500 rounded-xl">
      <img
        :src="movieImageUrl"
        :alt="movie.name"
        class="movie-poster w-full max-w-[500px] lg:h-full md:w-1/2 object-cover rounded-lg"
      />
      <div class="md:w-1/2 flex flex-col gap-2">
        <h2 class="text-center text-2xl lg:text-3xl font-black">{{ movie.name }} <br> <span class="text-xl lg:text-2xl font-normal">({{ movie.releaseYear }})</span></h2>
        <p>Réalisé par {{ movie.director }}</p>
        <p><strong>Synopsis: <br></strong> {{ movie.synopsis }}</p>
      </div>
    </div>
  </template>

<script setup>
import { computed } from "vue";

// Props passed from the parent component (App.vue)
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// Computed property to generate the image URL dynamically
const movieImageUrl = computed(() => {
  return `http://localhost:5000/uploads/${props.movie.imagePath}`;
});
</script>