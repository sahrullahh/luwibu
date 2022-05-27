import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import animeInfo from "../views/Animeinfo.vue";
import mangaInfo from "../views/Mangainfo.vue";
import Search from "../views/Search.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Luwibu - Search your Anime or Manga Information",
      description:
        "Welcome, at Luwibu this is an unofficial website, even though it's not official, I try to provide existing data, for information such as anime, manga, etc. This website was created, because I only wanted to learn, I wasn't too serious about making it like the official website, namely myAnimeLis",
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/animeinfo/:anime",
    name: "animeInfo",
    component: animeInfo,
    meta: {
      title: "Loading...",
    },
  },
  {
    path: "/search?q=:search",
    name: "search",
    component: Search,
    meta: {
      title: "Loading...",
    },
  },
  {
    path: "/mangainfo/:manga",
    name: "mangaInfo",
    component: mangaInfo,
    meta: {
      title: "Loading...",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
