<template>
  <section>
    <div class="date-title">
      <button @click="previousYear">&lt;&lt;&nbsp;&nbsp;</button>
      <button @click="previousMonth">&lt;&nbsp;&nbsp;</button>
      <h2>{{ year }}년 {{ month }}월</h2>
      <button @click="nextMonth">&nbsp;&nbsp;&gt;</button>
      <button @click="nextYear">&nbsp;&nbsp;&gt;&gt;</button>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoCalendar",
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
  },
  methods: {
    previousYear() {
      this.date = new Date(
        this.date.getFullYear() - 1,
        this.date.getMonth(),
        this.date.getDate()
      );
    },
    nextYear() {
      this.date = new Date(
        this.date.getFullYear() + 1,
        this.date.getMonth(),
        this.date.getDate()
      );
    },
    previousMonth() {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() - 1,
        this.date.getDate()
      );
    },
    nextMonth() {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        this.date.getDate()
      );
    },
  },
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}
.date-title {
  display: flex;
}
button {
  border: none;
  background: none;
}
</style>
