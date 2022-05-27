<template>
  <div id="app" class="font-quicksand">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue";

  export default {
    name: "HomeView",
    components: {
      Navbar,
    },
  };
</script>
