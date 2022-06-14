<template>
  <section>
    <nav-date
      @previous-year="previousYear"
      @next-year="nextYear"
      @previous-month="previousMonth"
      @next-month="nextMonth"
    ></nav-date>
    <BaseTable>
      <template #thead>
        <calendar-head></calendar-head>
      </template>
      <template #tbody>
        <calendar-body></calendar-body>
      </template>
    </BaseTable>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import NavDate from "./NavDate.vue";
import BaseTable from "./BaseTable.vue";
import CalendarHead from "./CalendarHead.vue";
import CalendarBody from "./CalendarBody.vue";

export default defineComponent({
  name: "TodoCalendar",
  components: { NavDate, BaseTable, CalendarHead, CalendarBody },
  data() {
    return {
      date: new Date(),
    };
  },
  provide() {
    return {
      getYear: () => this.year,
      getMonth: () => this.month,
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
      this.date = new Date(this.year - 1, this.month, this.date.getDate());
    },
    nextYear() {
      this.date = new Date(this.year + 1, this.month, this.date.getDate());
    },
    previousMonth() {
      this.date = new Date(this.year, this.month - 1, this.date.getDate());
    },
    nextMonth() {
      this.date = new Date(this.year, this.month + 1, this.date.getDate());
    },
  },
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}
</style>
