<template>
  <div class="home">
    <div class="container lg:max-w-5xl max-w-full mt-20 mx-auto p-3">
      <div class="bg-white border w-full p-10 rounded-md">
        <h2 class="text-4xl font-bold text-gray-800">Attention!</h2>
        <p class="text-gray-500 text-xs font-medium mt-5">
          Welcome, at Luwibu this is an unofficial website, even though it's not
          official, I try to provide existing data, for information such as
          anime, manga, etc. This website was created, because I only wanted to
          learn, I wasn't too serious about making it like the official website,
          namely myAnimeList.
        </p>
      </div>
      <h1 class="mt-20 font-bold text-4xl">Anime</h1>
      <h2 class="font-bold">Top Upcoming</h2>
      <p class="font-normal text-xs">Upcoming anime release</p>
      <div class="wrapper-nav mt-5">
        <button
          id="prevTopAnimeUp"
          class="uppercase px-4 py-3 text-xs bg-white rounded-full hover:bg-primary text-black hover:border-primary border-secondary border font-normal font-nunito"
        >
          <fa :icon="['fas', 'arrow-left']" />
        </button>
        <button
          id="nextTopAnimeUp"
          class="ml-5 uppercase px-4 py-3 text-xs rounded-full hover:bg-primary text-black hover:border-primary border-secondary border font-normal font-nunito"
        >
          <fa :icon="['fas', 'arrow-right']" />
        </button>
      </div>
      <div class="mt-5">
        <swiper
          ref="slideAnimeTop"
          :slide-per-view="4"
          :space-between="10"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :navigation="{
            prevEl: '#prevTopAnimeUp',
            nextEl: '#nextTopAnimeUp',
          }"
          :modules="modules"
          :loop="false"
          :breakpoints="swiperAnimeTopOptions.breakpoints"
        >
          <swiper-slide v-for="anime in topAnimeUpcoming" :key="anime.mal_id">
            <div class="card border bg-white w-full rounded-md">
              <img
                :src="anime.image_url"
                alt=""
                class="w-full object-cover lg:h-auto h-96 rounded-t-md"
              />
              <div class="content p-3">
                <a
                  href=""
                  class="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs"
                  >Rank #{{ anime.rank }}</a
                >
                <router-link
                  :to="{
                    name: 'animeInfo',
                    params: { anime: anime.mal_id },
                  }"
                >
                  <h2 class="mt-2 text-sm font-bold" :title="anime.title">
                    {{ anime.title }}
                  </h2>
                </router-link>
                <div class="space-y-4">
                  <p class="text-xs font-medium">
                    will be broadcast on {{ anime.type }}
                  </p>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <h2 class="font-bold mt-10">Top Anime</h2>
      <p class="font-normal text-xs">Recomended for you to watch</p>
      <div class="wrapper-nav w-full mt-5">
        <button
          id="prevTopAnime"
          class="uppercase px-4 py-3 text-xs bg-white rounded-full hover:bg-primary text-black hover:border-primary border-secondary border font-normal font-nunito"
        >
          <fa :icon="['fas', 'arrow-left']" />
        </button>
        <button
          id="nextTopAnime"
          class="ml-5 uppercase px-4 py-3 text-xs rounded-full hover:bg-primary text-black hover:border-primary border-secondary border font-normal font-nunito"
        >
          <fa :icon="['fas', 'arrow-right']" />
        </button>
      </div>
      <div class="mt-5">
        <swiper
          ref="slideAnimeTop"
          :slide-per-view="4"
          :space-between="10"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :navigation="{
            prevEl: '#prevTopAnime',
            nextEl: '#nextTopAnime',
          }"
          :modules="modules"
          :loop="false"
          :breakpoints="swiperAnimeTopOptions.breakpoints"
        >
          <swiper-slide v-for="anime in topAnime" :key="anime.mal_id">
            <div class="card border bg-white w-full rounded-md">
              <img
                :src="anime.image_url"
                alt=""
                class="w-full object-cover lg:h-auto h-96 rounded-t-md"
              />
              <div class="content p-3">
                <a
                  href=""
                  class="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs"
                  >Rank #{{ anime.rank }}</a
                >
                <router-link
                  :to="{
                    name: 'animeInfo',
                    params: { anime: anime.mal_id },
                  }"
                >
                  <h2 class="mt-2 text-sm font-bold" :title="anime.title">
                    {{ anime.title }}
                  </h2>
                </router-link>
                <div class="space-y-4">
                  <p class="text-xs font-medium">
                    will be broadcast on {{ anime.type }}
                  </p>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { Swiper, SwiperSlide } from "vue-awesome-swiper";
  import SwiperCore, { Autoplay } from "swiper/core";
  import { Pagination, Navigation } from "swiper";
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  SwiperCore.use([Autoplay]);

  const baseURL = "https://api.jikan.moe/v3/";
  export default {
    data() {
      return {
        topAnimeUpcoming: [],
        topAnime: [],
        swiperAnimeTopOptions: {
          breakpoints: {
            640: {
              slidesPerView: 2,
            },

            768: {
              slidesPerView: 3,
            },

            900: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },

            1280: {
              slidesPerView: 4,
            },
          },
        },
      };
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    async mounted() {
      axios
        .get(`${baseURL}top/anime/1/upcoming`)
        .then((response) => {
          this.topAnimeUpcoming = response.data.top;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`${baseURL}top/anime`)
        .then((response) => {
          this.topAnime = response.data.top;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setup() {
      return {
        modules: [Pagination, Navigation],
      };
    },
  };
</script>
