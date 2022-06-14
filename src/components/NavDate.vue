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
  inject: ["getYear", "getMonth"],
  computed: {
    year() {
      return this.getYear();
    },
    month() {
      return this.getMonth();
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
      this.$emit("next-month");
    },
  },
});
</script>

<style scoped>
nav {
  display: flex;
}
</style>
