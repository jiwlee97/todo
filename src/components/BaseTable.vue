<template>
  <table>
    <thead v-if="$slots.thead">
      <slot name="thead"></slot>
    </thead>
    <tbody v-if="$slots.tbody">
      <slot name="tbody"></slot>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTable",
});
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
}
</style>
