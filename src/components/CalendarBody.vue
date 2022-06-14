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

<script>
import { defineComponent } from "vue";
import CalendarCell from "./CalendarCell.vue";

export default defineComponent({
  name: "CalendarBody",
  components: { CalendarCell },
  inject: ["getYear", "getMonth"],
  computed: {
    year() {
      return this.getYear();
    },
    month() {
      return this.getMonth();
    },
    weekNum() {
      return Math.ceil(new Date(this.year, this.month + 1, 0).getDate() / 7);
    },
  },
  data() {
    return {
      dateInfos: [],
    };
  },
  watch: {
    year() {
      this.calcDateInfos();
    },
    month() {
      this.calcDateInfos();
    },
  },
  methods: {
    calcDateInfos() {
      const firstDayOfWeek = new Date(this.year, this.month, 1).getDay();
      const lastDayOfWeek = new Date(this.year, this.month + 1, 0).getDay();
      const prevMonthDateNum = new Date(this.year, this.month, 0).getDate();

      this.dateInfos = [];
      for (let weekInd = 0; weekInd < this.weekNum; weekInd++) {
        const weekDate = [];
        for (let day = 0; day < 7; day++) {
          if (weekInd === 0 && day < firstDayOfWeek) {
            weekDate.push({
              type: "prev",
              day: day,
              value: day + prevMonthDateNum - firstDayOfWeek + 1,
            });
          } else if (weekInd === this.weekNum - 1 && day > lastDayOfWeek) {
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
        this.dateInfos.push(weekDate);
      }
    },
  },
  beforeMount() {
    this.calcDateInfos();
  },
});
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
