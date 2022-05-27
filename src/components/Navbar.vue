<template>
  <header class="navbar p-2 border-b w-full fixed top-0 bg-jingga z-40">
    <div class="md:container mx-auto lg:max-w-5xl max-w-full">
      <div class="flex flex-warp justify-between w-full">
        <div class="flex flex-shrink-0 flex-warp justify-center">
          <h2 class="text-2xl text-gray-100 font-bold">Luwibu アニメ.</h2>
        </div>
        <div class="flex-grow">
          <input
            type="search"
            v-model="searchAnime"
            @keyup="searchFunc"
            @keyup.enter="searchQuery"
            placeholder="Search anime or manga.."
            class="input-search p-2 rounded-sm w-72 box-border outline-none text-xs ml-4 border"
          />
        </div>
        <div class="flex gap-5 text-white text-sm mt-1">
          <router-link to="/">Home</router-link>
          <router-link to="/">Release</router-link>
          <router-link to="/">Character</router-link>
          <router-link to="/">Anime</router-link>
          <router-link to="/">Manga</router-link>
        </div>
      </div>
    </div>
  </header>
  <div
    class="w-full fixed z-30 top-0 bg-transparent h-auto"
    v-if="searchAnime.length > 0"
  >
    <div
      class="container bg-white border max-w-5xl mx-auto overflow-y-scroll h-96 lg:flex grid grid-cols-1 gap-5 mt-10"
    >
      <div
        class="listiem bg-white w-full p-2 lg:mt-4 mt-5 lg:ml-4 ml-0"
        v-if="searchAnime.length > 0"
      >
        <h2 class="font-bold text-sm">Result for Anime :</h2>
        <div
          class="list w-full p-2 flex gap-2 hover:bg-gray-100"
          v-for="search in resultAnime.slice(0, 5)"
          :key="search.mal_id"
        >
          <div>
            <img class="w-10" :src="search.image_url" alt="" />
          </div>
          <div class="">
            <h2 class="text-sm font-bold truncate box-border">
              <a
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
          </div>
        </div>
      </div>
      <div
        class="listiem bg-white w-full p-2 lg:mt-4 mt-5 lg:ml-4 ml-0"
        v-if="searchAnime.length > 0"
      >
        <h2 class="font-bold text-sm">Result for Manga :</h2>
        <div
          class="list w-full p-2 flex gap-2 hover:bg-gray-100"
          v-for="search in resultManga.slice(0, 5)"
          :key="search.mal_id"
        >
          <div>
            <img class="w-10" :src="search.image_url" alt="" />
          </div>
          <div class="">
            <h2 class="text-sm font-bold truncate box-border">
              <a
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
          </div>
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
        searchAnime: "",
        resultAnime: [],
        resultManga: [],
      };
    },
    methods: {
      searchQuery: function () {
        this.$router.push({
          name: "search",
          params: { search: `${this.searchAnime}` },
        }).href;
      },
      searchFunc: function () {
        console.clear();
        axios
          .get(`${baseURL}search/anime?q=${this.searchAnime}`)
          .then((response) => {
            this.resultAnime = response.data.results;
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get(`${baseURL}search/manga?q=${this.searchAnime}`)
          .then((response) => {
            this.resultManga = response.data.results;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    watch: {
      $route: function () {
        this.searchAnime = "";
      },
    },
    mounted() {},
  };
</script>

<style></style>
