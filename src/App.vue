<template>
  <div id="app" class="font-quicksand">
    <vue-progress-bar></vue-progress-bar>
    <Navbar />
    <router-view :key="$route.fullPath"></router-view>
    <Footer />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";

  export default {
    name: "HomeView",
    components: {
      Navbar,
      Footer,
    },
  };
</script>
