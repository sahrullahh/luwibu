<template>
  <div class="container mx-auto max-w-5xl mt-20">
    <h2 class="mt-10">Result Search : {{ this.$route.params.search }}</h2>
  </div>
  <div class="search container p-5 mt-5 max-w-5xl mx-auto flex gap-5">
    <div class="flex-auto">
      <div
        class="list p-2 flex gap-2 hover:bg-gray-100 max-w-lg"
        v-for="search in resultAnime"
        :key="search.mal_id"
      >
        <div>
          <img class="w-20" :src="search.image_url" alt="" />
        </div>
        <div class="ml-4">
          <h2 class="text-xs font-bold box-border mt-2">
            <a
              class="break-all"
              :href="
                $router.resolve({
                  name: 'animeInfo',
                  params: { anime: search.mal_id },
                }).href
              "
            >
              {{ search.title }}
            </a>
          </h2>
          <p class="text-xs">
            <i class="text-yellow-500"><fa :icon="['fas', 'star']" /></i>
            {{ search.score }}
          </p>
          <p class="text-xs">Eps : {{ search.episodes }}</p>
          <p class="text-xs font-bold">Type: Anime</p>
        </div>
      </div>
    </div>
    <div class="flex-auto">
      <div
        class="list p-2 flex gap-2 hover:bg-gray-100 max-w-lg"
        v-for="search in resultManga"
        :key="search.mal_id"
      >
        <div>
          <img class="w-20" :src="search.image_url" alt="" />
        </div>
        <div class="ml-4">
          <h2 class="text-xs font-bold truncate box-border mt-2">
            <a
              class="break-all"
              :href="
                $router.resolve({
                  name: 'mangaInfo',
                  params: { manga: search.mal_id },
                }).href
              "
            >
              {{ search.title }}
            </a>
          </h2>
          <p class="text-xs">
            <i class="text-yellow-500"><fa :icon="['fas', 'star']" /></i>
            {{ search.score }}
          </p>
          <p class="text-xs">Vol : {{ search.volumes }}</p>
          <p class="text-xs font-bold">Type: Manga</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  const baseURL = "https://api.jikan.moe/v3/";

  export default {
    data() {
      return {
        resultAnime: [],
        resultManga: [],
      };
    },
    watch: {
      $route: function () {
        document.querySelector(".input-search").value =
          this.$route.params.search;
      },
    },
    mounted() {
      console.clear();
      axios
        .get(`${baseURL}search/anime?q=${this.$route.params.search}`)
        .then((response) => {
          this.resultAnime = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`${baseURL}search/manga?q=${this.$route.params.search}`)
        .then((response) => {
          this.resultManga = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(this.$route.params);
    },
  };
</script>

<style></style>
