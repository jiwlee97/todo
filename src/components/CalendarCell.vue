<template>
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
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CalendarCell",
  props: {
    type: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    showTodoList(date) {
      console.log("showTodoList at ", this.year, this.month + 1, date);
    },
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
.add-button {
  position: absolute;
  top: 8px;
  right: 16px;
}
</style>
