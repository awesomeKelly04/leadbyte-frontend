<template>
  <v-app id="keep" class="app">
    <v-main>
      <v-container fluid class="app-container">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  components: {
  },

  data: () => ({
    drawer: false
  }),
};
</script>

<style>
* {
  font-family: IBM Plex Sans,sans-serif !important;
}
.app-container {
  padding: 0 0 !important;
  background-color: #E4F0D4 !important;
}
</style>