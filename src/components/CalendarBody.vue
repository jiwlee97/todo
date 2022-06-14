<template>
  <tr v-for="week in weekNum" :key="week">
    <td
      v-for="{ type, day, value } in dateInfos[week - 1]"
      :key="type + day + value"
    >
      <span
        :class="[
          type,
          {
            sunday: day === 0,
            saturday: day === 6,
          },
        ]"
        >{{ value }}</span
      >
      <button
        v-if="type === 'curr'"
        class="add-button"
        @click="showTodoList(value)"
      >
        +
      </button>
    </td>
  </tr>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CalendarBody",
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
  computed: {
    weekNum() {
      return Math.ceil(new Date(this.year, this.month + 1, 0).getDate() / 7);
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
    showTodoList(date) {
      console.log("showTodoList at ", this.year, this.month + 1, date);
    },
  },
  beforeMount() {
    this.calcDateInfos();
  },
});
</script>

<style scoped>
.sunday {
  color: rgb(239 68 68);
}
.saturday {
  color: rgb(59 130 246);
}
.prev,
.next {
  color: gray;
}
td {
  border: 1px solid gray;
  height: 128px;
  vertical-align: top;
  text-align: left;
  padding: 5px 7px;
  position: relative;
}
.add-button {
  position: absolute;
  top: 8px;
  right: 16px;
}
</style>
