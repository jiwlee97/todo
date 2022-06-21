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
        :dateOfDate="value"
        :todos="todos"
        @close-todo-list="closeTodoList"
        @post-todo="postTodo"
        @delete-todo="deleteTodo"
    ></todo-list>
  </teleport>
</template>

<script lang="ts" setup>
import axios from "axios";
import TodoList from "./TodoList.vue";
import {ref, computed, inject, Ref, defineProps, onBeforeMount} from 'vue';

const backUrl = process.env.VUE_APP_BACK_URL;

const showTodoList = ref(false);
const todos = ref<any[]>([]);
const date: Ref<Date> | undefined = inject('date');
if (date === undefined) {
  throw Error('Could not inject date');
}
const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());

const props = defineProps(['type', 'day', 'value']);

const openTodoList = () => {
  showTodoList.value = true;
};
const closeTodoList = () => {
  showTodoList.value = false;
};
const getTodos =
    () => {
      axios
          .get(`${backUrl}/${year.value}-${month.value}-${props.value}.json`)
          .then((response) => {
            if (response.data) {
              todos.value = Object.entries(response.data);
            } else {
              todos.value = [];
            }
          });
    };
const postTodo = (newTodo: string) => {
  axios
      .post(`${backUrl}/${year.value}-${month.value}-${props.value}.json`, {
        todo: newTodo,
      })
      .then(() => {
        getTodos();
      })
      .catch((err) => {
        console.dir(err);
      });
};

const deleteTodo = (id: string) => {
  axios
      .delete(
          `${backUrl}/${year.value}-${month.value}-${props.value}/${id}.json`
      )
      .then(() => {
        todos.value = todos.value.filter((todo) => {
          return todo[0] !== id;
        });
      });
}

onBeforeMount(() => getTodos());
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
