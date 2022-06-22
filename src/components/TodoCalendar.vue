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

<script lang="ts" setup>
import {ref, computed, provide} from 'vue';
import NavDate from "./NavDate.vue";
import BaseTable from "./BaseTable.vue";
import CalendarHead from "./CalendarHead.vue";
import CalendarBody from "./CalendarBody.vue";

const date = ref(new Date());

const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());

const previousYear = () => {
  date.value = new Date(year.value - 1, month.value, date.value.getDate());
};
const nextYear = () => {
  date.value = new Date(year.value + 1, month.value, date.value.getDate());
};
const previousMonth = () => {
  date.value = new Date(year.value, month.value - 1, date.value.getDate());
};
const nextMonth = () => {
  date.value = new Date(year.value, month.value + 1, date.value.getDate());
};

provide('date', date);
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}
</style>
