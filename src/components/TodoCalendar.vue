<template>
  <section>
    <div class="date-title">
      <button @click="previousYear">&lt;&lt;&nbsp;&nbsp;</button>
      <button @click="previousMonth">&lt;&nbsp;&nbsp;</button>
      <h2>{{ year }}년 {{ month }}월</h2>
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
        <tr v-for="num in 5" :key="num">
          <td><span>1</span></td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
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
}
</style>
