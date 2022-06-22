<template>
  <nav class="date-title">
    <button @click="previousYear">&lt;&lt;&nbsp;&nbsp;</button>
    <button @click="previousMonth">&lt;&nbsp;&nbsp;</button>
    <h2>{{ year }}년 {{ month }}월</h2>
    <button @click="nextMonth">&nbsp;&nbsp;&gt;</button>
    <button @click="nextYear">&nbsp;&nbsp;&gt;&gt;</button>
  </nav>
</template>

<script lang="ts" setup>
import { inject, Ref, computed, defineEmits } from 'vue';

const date: Ref<Date> | undefined = inject('date');
if (date === undefined) {
  throw Error('Could not inject date');
}

const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth() + 1);

const emit = defineEmits(['previous-year', 'next-year', 'previous-month', 'next-month']);

const previousYear = () =>  {
  emit("previous-year");
};
const nextYear = () => {
  emit("next-year");
};
const previousMonth = () =>  {
  emit("previous-month");
};
const nextMonth = () => {
  emit("next-month");
};
</script>

<style scoped>
nav {
  display: flex;
}
</style>
