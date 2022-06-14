<template>
  <section>
    <nav-date
      :year="year"
      :month="month"
      @previous-year="previousYear"
      @next-year="nextYear"
      @previous-month="previousMonth"
      @next-month="nextMonth"
    ></nav-date>
    <BaseTable>
      <template #thead>
        <th class="sunday">일</th>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th class="saturday">토</th>
      </template>
      <template #tbody>
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
            <button class="add-button" @click="showTodoList(value)">+</button>
          </td>
        </tr>
      </template>
    </BaseTable>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import NavDate from "./NavDate.vue";
import BaseTable from "./BaseTable.vue";

export default defineComponent({
  name: "TodoCalendar",
  components: { NavDate, BaseTable },
  data() {
    return {
      date: new Date(),
      dateInfos: [],
    };
  },
  computed: {
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
    weekNum() {
      return Math.ceil(new Date(this.year, this.month + 1, 0).getDate() / 7);
    },
  },
  watch: {
    date() {
      this.calcDateInfos();
    },
  },
  beforeMount() {
    this.calcDateInfos();
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
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}
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
