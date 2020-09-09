<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    // console.log('hello')
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
@font-face {
  font-family: 'Airbnb Cereal App';
  src: url(./assets/font/AirbnbCerealMedium.woff);
}

#app {
  font-family: Airbnb Cereal App, Helvetica, Arial, sans-serif;
  font-size: 10px;
  background: rgba(190, 195, 202, 0.3);
}
</style>
