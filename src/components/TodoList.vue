<template>
  <right-box>
    <h2>TodoList</h2>
    <h3>{{ year }} / {{ month }} / {{ date }}</h3>
    <button class="close-button" @click="closeTodoList">X</button>
    <section>
      <form @submit.prevent="postTodo">
        <input type="text" v-model="todoText" />
        <button class="add-button">ADD</button>
      </form>
    </section>
  </right-box>
</template>

<script>
import { defineComponent } from "vue";
import RightBox from "./RightBox.vue";

export default defineComponent({
  components: { RightBox },
  name: "TodoList",
  inject: ["getYear", "getMonth", "closeTodoList"],
  computed: {
    year() {
      return this.getYear();
    },
    month() {
      return this.getMonth();
    },
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
});
</script>

<style scoped>
h2,
h3 {
  margin-bottom: 20px;
}
form {
  display: flex;
  justify-content: space-evenly;
}
input {
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  margin-right: 5px;
  font-size: 16px;
}
input:focus {
  outline: none;
}
.add-button {
  background: #f59e0b;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
}
</style>
