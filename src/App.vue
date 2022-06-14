<template>
  <the-header :title="'Todo Calendar'"></the-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from "@/components/TheHeader.vue";

export default defineComponent({
  name: 'App',
  components: {TheHeader},
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
