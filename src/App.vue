<template>
  <the-header :title="'Todo Calendar'"></the-header>
  <todo-calendar></todo-calendar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TodoCalendar from "./components/TodoCalendar.vue";

export default defineComponent({
  name: "App",
  components: { TheHeader, TodoCalendar },
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  cursor: pointer;
  border: none;
  background: none;
}
li {
  list-style: none;
}
</style>
