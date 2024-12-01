<template>
  <div id="app" class="bg-gray-800 text-zinc-50">
    <div class="p-2 mx-auto h-screen max-w-[900px] flex flex-col justify-center gap-10">
      <header class="text-center">
        <h1 class="text-2xl md:text-4xl font-bold">Film du jour 🎬</h1>
      </header>
      <main>
        <MovieCard v-if="movieOfTheDay" :movie="movieOfTheDay" />
      </main>
    </div>
  </div>
</template>

<script setup>
import './index.css'
import { ref, onMounted } from "vue";
import api from "./api";  // Import the API service
import MovieCard from "./components/MovieCard.vue"; // Import MovieCard component

// State to hold the movie of the day
const movieOfTheDay = ref(null);

// Fetch the movie of the day when the component is mounted
onMounted(async () => {
  try {
    const response = await api.getMovieOfTheDay();
    movieOfTheDay.value = response.data; // Set the movie of the day data
  } catch (error) {
    console.error("Error fetching movie of the day:", error);
  }
});
</script>