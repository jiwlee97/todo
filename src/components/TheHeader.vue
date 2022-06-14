<template>
  <header>
    <img src="logo.png" class="logo-img" />
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
header {
  background-color: rgb(253 224 71);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.logo-img {
  width: 24px;
  height: 24px;
  transform: rotate(-40deg);
}
h1 {
  margin-left: 10px;
  font-size: 20px;
}
</style>
