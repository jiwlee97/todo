<template>
  <section>
    <div class="date-title">
      <button @click="previousYear">&lt;&lt;&nbsp;&nbsp;</button>
      <button @click="previousMonth">&lt;&nbsp;&nbsp;</button>
      <h2>{{ year }}년 {{ month + 1 }}월</h2>
      <button @click="nextMonth">&nbsp;&nbsp;&gt;</button>
      <button @click="nextYear">&nbsp;&nbsp;&gt;&gt;</button>
    </div>
    <table>
      <thead>
        <th class="sunday">일</th>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th class="saturday">토</th>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoCalendar",
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
.date-title {
  display: flex;
}
button {
  border: none;
  background: none;
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
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
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
