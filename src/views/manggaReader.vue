<template>
  <div class="manga">
    <div class="container max-w-5xl mx-auto p-2 mt-20">
      <div class="detail-manga">
        <img
          src="https://img.komiku.id/wp-content/uploads/2272930-4.webp"
          :alt="this.title"
        />

        <h2 class="text-2xl text-gray-800">Judul : {{ this.title }}</h2>
        <div class="space-y-3 mt-4">
          <p class="text-xs text-gray-500">Tipe : {{ this.type }}</p>
          <p class="text-xs text-gray-500">Pembuat: {{ this.author }}</p>
          <p class="text-xs text-gray-500">Status: {{ this.status }}</p>
        </div>
        <h2 class="text-sm mt-2">Genre :</h2>
        <div class="genre flex gap-5 mt-2">
          <p
            v-for="item in genre"
            :key="item.name"
            class="text-xs text-gray-700 font-bold"
          >
            {{ item.genre_name }}
          </p>
        </div>
        <h2 class="text-sm mt-2">Chapter :</h2>
        <div class="chapter grid grid-cols-4 gap-5 mt-5">
          <a
            v-for="item in chapter"
            :key="item.chapter_title"
            class="text-xs text-gray-700 font-bold"
          >
            {{ item.chapter_title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  const baseUrlManga = "http://localhost:3000/api/";
  export default {
    data() {
      return {};
    },
    mounted() {
      axios
        .get(`${baseUrlManga}manga/chapter/${this.$route.params.chapter}`)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },
  };
</script>

<style></style>
