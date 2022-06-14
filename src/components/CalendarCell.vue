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
  <button v-if="type === 'curr'" class="add-button" @click="openTodoList">
    +
  </button>
  <ul v-if="todos.length">
    <li v-for="[id, value] in todos" :key="id">{{ value.todo }}</li>
  </ul>
  <teleport to="#app" v-if="showTodoList">
    <todo-list
      :date="value"
      :todos="todos"
      @close-todo-list="closeTodoList"
      @post-todo="postTodo"
      @delete-todo="deleteTodo"
    ></todo-list>
  </teleport>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import TodoList from "./TodoList.vue";

const backUrl = process.env.VUE_APP_BACK_URL;

export default defineComponent({
  name: "CalendarCell",
  components: { TodoList },
  inject: ["getYear", "getMonth"],
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
  computed: {
    year() {
      return this.getYear();
    },
    month() {
      return this.getMonth();
    },
  },
  data() {
    return {
      showTodoList: false,
      todos: [],
    };
  },
  methods: {
    openTodoList() {
      this.showTodoList = true;
    },
    closeTodoList() {
      this.showTodoList = false;
    },
    getTodos() {
      axios
        .get(`${backUrl}/${this.year}-${this.month}-${this.value}.json`)
        .then((response) => {
          if (response.data) {
            this.todos = Object.entries(response.data);
          } else {
            this.todos = [];
          }
          console.log("this.todos", this.todos);
        });
    },
    postTodo(newTodo) {
      console.log("postTodo", newTodo);
      axios
        .post(`${backUrl}/${this.year}-${this.month}-${this.value}.json`, {
          todo: newTodo,
        })
        .then(() => {
          this.getTodos();
          console.log("post success!");
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    deleteTodo(id) {
      axios
        .delete(
          `${backUrl}/${this.year}-${this.month}-${this.value}/${id}.json`
        )
        .then(() => {
          this.todos = this.todos.filter((todo) => {
            return todo[0] !== id;
          });
        });
    },
  },
  beforeMount() {
    this.getTodos();
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
li {
  background: rgb(253 224 71);
  border-radius: 10px;
  margin-bottom: 1px;
  padding: 0px 7px;
}
</style>
