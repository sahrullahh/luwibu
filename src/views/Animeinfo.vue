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
            <p class="text-normal">Episode : {{ this.episode }}</p>
            <p class="text-normal">For Age : {{ this.rating }}</p>
            <p class="text-normal">Duration : {{ this.duration }}</p>
            <p class="text-normal">Popularity : {{ this.popular }}</p>
            <p class="text-normal">Favorites : {{ this.favorite }}</p>
            <p class="text-normal">Type : {{ this.types }}</p>
            <p class="text-normal">Premiered : {{ this.premiered }}</p>
            <p class="text-normal">Broadcast : {{ this.broadcast }}</p>
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
            <h2 class="font-bold text-red-600">Spoiler Alert!!</h2>
            <h2 class="mt-4 text-sm font-bold">Synopsis :</h2>
            <p class="text-sm font-medium mt-2 text-gray-500">
              {{ this.synopsis }}
            </p>
            <h2 class="mt-4 text-sm font-bold">Background :</h2>
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
              <h2 class="font-bold">Studio :</h2>
              <div class="mt-4" v-for="item in studio" :key="item.mal_id">
                <p class="font-normal text-xs">{{ item.name }}</p>
              </div>
              <h2 class="font-bold mt-5">Demographics :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in demographics"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
            <div class="flex-auto">
              <h2 class="font-bold">Lincensor :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in license"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
            <div class="flex-auto">
              <h2 class="font-bold">Producers :</h2>
              <div
                class="mt-4 text-xs"
                v-for="item in producers"
                :key="item.mal_id"
              >
                <p class="font-normal">{{ item.name }}</p>
              </div>
            </div>
          </div>
          <div class="ml-0 mt-10 p-5">
            <h2 class="font-bold">Trailer :</h2>
            <div class="mt-10">
              <div
                id="player"
                data-plyr-provider="youtube"
                :data-plyr-embed-id="this.embed"
              ></div>
            </div>
          </div>
          <div class="ml-0 mt-10 p-5">
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
                  class="border-gray-500"
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
        rank: "",
        episode: "",
        duration: "",
        favorite: "",
        popular: "",
        rating: "",
        status: "",
        studio: [],
        producers: [],
        licensors: [],
        genre: [],
        themes: [],
        demographics: [],
        premiered: "",
        broadcast: "",
        types: "",
        embed: "",
        characters: [],
        background: "",
      };
    },
    props: ["data-ply-embed-id"],
    watch: {
      $route: function () {
        const player = new Plyr("#player");

        axios
          .get(`${baseURL}anime/${this.$route.params.anime}`)
          .then((response) => {
            this.title = response.data.title;
            this.title_eng = response.data.title_english;
            this.title_jpn = response.data.title_japanese;
            this.poster = response.data.image_url;
            this.synopsis = response.data.synopsis;
            this.score = response.data.score;
            this.rank = response.data.rank;
            this.episode = response.data.episodes;
            this.duration = response.data.duration;
            this.favorite = response.data.favorites;
            this.popular = response.data.popularity;
            this.status = response.data.status;
            this.studio = response.data.studios;
            this.license = response.data.licensors;
            this.rating = response.data.rating;
            this.genre = response.data.genres;
            this.producers = response.data.producers;
            this.themes = response.data.themes;
            this.premiered = response.data.premiered;
            this.broadcast = response.data.broadcast;
            this.types = response.data.type;
            this.background = response.data.background;
            document.title =
              this.title +
              " : " +
              this.title_eng +
              " : " +
              this.title_jpn +
              " (Anime)" +
              " - Luwibu";
            this.demographics = response.data.demographics;
            let embedVideo = getVideoId(response.data.trailer_url);
            this.embed = "https://www.youtube.com/embed/" + embedVideo.id;
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get(`${baseURL}anime/${this.$route.params.anime}/characters_staff`)
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
      window.player = player;

      // Bind event listener

      axios
        .get(`${baseURL}anime/${this.$route.params.anime}`)
        .then((response) => {
          this.title = response.data.title;
          this.title_eng = response.data.title_english;
          this.title_jpn = response.data.title_japanese;
          this.poster = response.data.image_url;
          this.synopsis = response.data.synopsis;
          this.score = response.data.score;
          this.rank = response.data.rank;
          this.episode = response.data.episodes;
          this.duration = response.data.duration;
          this.favorite = response.data.favorites;
          this.popular = response.data.popularity;
          this.status = response.data.status;
          this.studio = response.data.studios;
          this.license = response.data.licensors;
          this.rating = response.data.rating;
          this.genre = response.data.genres;
          this.producers = response.data.producers;
          this.themes = response.data.themes;
          this.premiered = response.data.premiered;
          this.broadcast = response.data.broadcast;
          this.background = response.data.background;
          this.types = response.data.type;
          document.title =
            this.title +
            " : " +
            this.title_eng +
            " : " +
            this.title_jpn +
            " (Anime)" +
            " - Luwibu";
          this.demographics = response.data.demographics;
          let embedVideo = getVideoId(response.data.trailer_url);
          this.embed = "https://www.youtube.com/embed/" + embedVideo.id;
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${baseURL}anime/${this.$route.params.anime}/characters_staff`)
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
