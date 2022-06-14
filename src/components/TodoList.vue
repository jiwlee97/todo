<template>
  <right-box>
    <h2>TodoList</h2>
    <h3>{{ year }} / {{ month }} / {{ date }}</h3>
    <button class="close-button" @click="closeTodoList">X</button>
    <section>
      <form @submit.prevent="postTodo">
        <input type="text" placeholder="your todo!" v-model="todoText" />
        <button class="add-button">ADD</button>
      </form>
      <ul v-if="todos.length">
        <li v-for="[id, value] in todos" :key="id">
          <p>{{ value.todo }}</p>
          <button class="del-button" @click="deleteTodo(id)">DEL</button>
        </li>
      </ul>
    </section>
  </right-box>
</template>

<script>
import { defineComponent } from "vue";
import RightBox from "./RightBox.vue";

export default defineComponent({
  components: { RightBox },
  name: "TodoList",
  inject: ["getYear", "getMonth"],
  emits: ["close-todo-list", "post-todo", "delete-todo"],
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
      type: Number,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
    closeTodoList() {
      this.$emit("close-todo-list");
    },
    postTodo() {
      if (this.todoText.trim()) {
        this.$emit("post-todo", this.todoText);
        this.todoText = "";
      }
    },
    deleteTodo(id) {
      this.$emit("delete-todo", id);
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
  margin-bottom: 20px;
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
.del-button {
  background: #ea580c;
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
li {
  display: flex;
  margin-bottom: 5px;
}
p {
  width: 100%;
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 5px;
}
</style>
