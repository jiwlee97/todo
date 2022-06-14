<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RightBox",
});
</script>

<style scoped>
div {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 400px;
  height: 100%;
  background: rgb(253 224 71);
  border-left: 2px solid white;
  text-align: center;
  padding: 20px 50px;
}
</style>
