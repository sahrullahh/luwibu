<template>
  <div class="animinfo">
    <div class="container max-w-5xl mx-auto mt-20">
      <div class="lg:flex table gap-2">
        <!-- <h2>Result search : {{ this.title}}</h2> -->
        <div
          class="lg:flex-none flex-auto lg:w-auto w-full lg:p-0 p-5 lg:ml-0 ml-4 table-header-group"
        >
          <img
            :src="this.poster"
            :alt="this.title"
            class="border lg:ml-0 ml-4"
          />
          <div class="space-y-4 text-xs mt-4 font-medium lg:ml-0 ml-4">
            <p class="text-normal">Rank : #{{ this.rank }}</p>
            <p class="text-normal">Volume : {{ this.volume }}</p>
            <p class="text-normal">Chapters : {{ this.chapter }}</p>
            <p class="text-normal">Popularity : {{ this.popular }}</p>
            <p class="text-normal">Favorites : {{ this.favorite }}</p>
            <p class="text-normal">Type : {{ this.types }}</p>
            <p class="text-normal">Status : {{ this.status }}</p>
          </div>
        </div>
        <div class="lg:flex-auto w-full table-footer-group">
          <div class="content ml-4 lg:mt-0 mt-4">
            <h2 class="text-2xl font-bold">{{ this.title }}</h2>
            <div class="flex">
              <p class="font-bold">{{ this.title_eng }} :</p>
              <p class="font-bold ml-2">{{ this.title_jpn }}</p>
            </div>
            <p>
              <i class="mr-2 text-yellow-500"><fa :icon="['fas', 'star']" /></i
              >{{ this.score }}
            </p>

            <p class="text-sm font-medium mt-2 text-gray-500">
              {{ this.synopsis }}
            </p>
            <h2 class="text-lg font-bold mt-4">Background :</h2>
            <p class="text-sm font-medium mt-2 text-gray-500">
              {{ this.background }}
            </p>
          </div>
          <div class="lg:flex grid grid-cols-2 lg:gap-4 gap-8 mt-5 ml-4">
            <div class="flex-auto">
              <h2 class="font-bold">Genre :</h2>
              <div class="mt-4" v-for="item in genre" :key="item.mal_id">
                <p class="font-normal text-xs">{{ item.name }}</p>
              </div>
              <h2 class="font-bold mt-5">Themes :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in themes"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
            <div class="flex-auto ml-4">
              <h2 class="font-bold">Demographics :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in demographics"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
            <div class="flex-auto">
              <h2 class="font-bold">Serializations :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in serial"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
            <div class="flex-auto">
              <h2 class="font-bold">authors :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in author"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
          </div>
          <div class="lg:ml-4 ml-0 mt-10 p-5">
            <h2 class="font-bold">Characters :</h2>
            <div class="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-5">
              <div
                class="card bg-white w-full"
                v-for="item in characters"
                :key="item.mal_id"
              >
                <img
                  :src="item.image_url"
                  :alt="item.name"
                  :title="item.name"
                />
                <h2 class="text-lg font-bold">{{ item.name }}</h2>
                <p class="font-normal text-xs">{{ item.role }}</p>
              </div>
            </div>
          </div>
          <!-- <p>{{ this.synopsis }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Plyr from "plyr";

  import getVideoId from "get-video-id";
  import axios from "axios";
  const baseURL = "https://api.jikan.moe/v3/";
  export default {
    data() {
      return {
        title: "",
        title_eng: "",
        title_jpn: "",
        poster: "",
        synopsis: "",
        score: "",
        background: "",
        rank: "",
        volume: "",
        duration: "",
        favorite: "",
        popular: "",
        status: "",
        author: [],
        serializations: [],
        genre: [],
        themes: [],
        types: "",
        demographics: [],
        characters: [],
      };
    },
    watch: {
      $route: function () {
        axios
          .get(`${baseURL}manga/${this.$route.params.manga}`)
          .then((response) => {
            this.title = response.data.title;
            this.title_eng = response.data.title_english;
            this.title_jpn = response.data.title_japanese;
            this.poster = response.data.image_url;
            this.synopsis = response.data.synopsis;
            this.score = response.data.score;
            this.rank = response.data.rank;
            this.volume = response.data.volumes;
            this.favorite = response.data.favorites;
            this.popular = response.data.popularity;
            this.status = response.data.status;
            this.serial = response.data.serializations;
            this.chapter = response.data.chapters;
            this.genre = response.data.genres;
            this.author = response.data.authors;
            this.themes = response.data.themes;
            this.background = response.data.background;
            this.types = response.data.type;
            this.demographics = response.data.demographics;
            document.title =
              "Luwibu - " +
              this.title +
              " : " +
              this.title_eng +
              " : " +
              this.title_jpn +
              " (Manga)";
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get(`${baseURL}manga/${this.$route.params.manga}/characters`)
          .then((response) => {
            this.characters = response.data.characters;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    mounted() {
      const player = new Plyr("#player");
      axios
        .get(`${baseURL}manga/${this.$route.params.manga}`)
        .then((response) => {
          this.title = response.data.title;
          this.title_eng = response.data.title_english;
          this.title_jpn = response.data.title_japanese;
          this.poster = response.data.image_url;
          this.synopsis = response.data.synopsis;
          this.score = response.data.score;
          this.rank = response.data.rank;
          this.volume = response.data.volumes;
          this.favorite = response.data.favorites;
          this.popular = response.data.popularity;
          this.status = response.data.status;
          this.serial = response.data.serializations;
          this.chapter = response.data.chapters;
          this.genre = response.data.genres;
          this.author = response.data.authors;
          this.themes = response.data.themes;
          this.background = response.data.background;
          this.types = response.data.type;
          this.demographics = response.data.demographics;
          document.title =
            "Luwibu - " +
            this.title +
            " : " +
            this.title_eng +
            " : " +
            this.title_jpn +
            " (Manga)";
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${baseURL}manga/${this.$route.params.manga}/characters`)
        .then((response) => {
          this.characters = response.data.characters;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    destroyed() {},
  };
</script>

<style></style>
