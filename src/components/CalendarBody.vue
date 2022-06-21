<template>
  <tr v-for="week in weekNum" :key="week">
    <td
        v-for="{ type, day, value } in dateInfos[week - 1]"
        :key="type + day + value"
    >
      <calendar-cell :type="type" :day="day" :value="value"></calendar-cell>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import CalendarCell from "./CalendarCell.vue";
import {ref, computed, watch, inject, Ref, onBeforeMount} from 'vue';

interface IDateInfo {
  type: string;
  day: number;
  value: number;
}

const dateInfos = ref<IDateInfo[]>([]);
const date: Ref<Date> | undefined = inject('date');
if (date === undefined) {
  throw Error('Could not inject date.');
}

const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());

const weekNum = computed(() =>
    Math.ceil(new Date(year.value, month.value + 1, 0).getDate() / 7)
);

watch([year, month], () => {
  calcDateInfos();
});

const calcDateInfos = () => {
  const firstDayOfWeek = new Date(year.value, month.value, 1).getDay();
  const lastDayOfWeek = new Date(year.value, month.value + 1, 0).getDay();
  const prevMonthDateNum = new Date(year.value, month.value, 0).getDate();

  dateInfos.value = [];
  for (let weekInd = 0; weekInd < weekNum.value; weekInd++) {
    const weekDate = [];
    for (let day = 0; day < 7; day++) {
      if (weekInd === 0 && day < firstDayOfWeek) {
        weekDate.push({
          type: "prev",
          day: day,
          value: day + prevMonthDateNum - firstDayOfWeek + 1,
        });
      } else if (weekInd === weekNum.value - 1 && day > lastDayOfWeek) {
        weekDate.push({
          type: "next",
          day: day,
          value: day - lastDayOfWeek,
        });
      } else {
        weekDate.push({
          type: "curr",
          day: day,
          value: weekInd * 7 + day - firstDayOfWeek + 1,
        });
      }
    }
    dateInfos.value.push(weekDate);
  }
};

onBeforeMount(() => calcDateInfos());

</script>

<style scoped>
td {
  border: 1px solid gray;
  height: 128px;
  vertical-align: top;
  text-align: left;
  padding: 5px 7px;
  position: relative;
}
</style>
