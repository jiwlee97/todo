<template>
  <nav class="date-title">
    <button @click="previousYear">&lt;&lt;&nbsp;&nbsp;</button>
    <button @click="previousMonth">&lt;&nbsp;&nbsp;</button>
    <h2>{{ year }}년 {{ month + 1 }}월</h2>
    <button @click="nextMonth">&nbsp;&nbsp;&gt;</button>
    <button @click="nextYear">&nbsp;&nbsp;&gt;&gt;</button>
  </nav>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavDate",
  emits: ["previous-year", "next-year", "previous-month", "next-month"],
  props: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  methods: {
    previousYear() {
      this.$emit("previous-year");
    },
    nextYear() {
      this.$emit("next-year");
    },
    previousMonth() {
      this.$emit("previous-month");
    },
    nextMonth() {
      this.$emit("next-year");
    },
  },
});
</script>

<style scoped>
nav {
  display: flex;
}
</style>
