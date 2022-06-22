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
import { ITodoItem, ITodoList } from "@/types/types";
import {ref, computed, inject, Ref, defineProps, onBeforeMount} from 'vue';

const backUrl = process.env.VUE_APP_BACK_URL;

const showTodoList = ref(false);
const todos = ref<ITodoList>([]);
const date: Ref<Date> | undefined = inject('date');
if (date === undefined) {
  throw Error('Could not inject date');
}

const props = defineProps(['type', 'day', 'value']);

const cellDate = computed(() => {
  if (props.type === 'curr') {
    return new Date(date.value.getFullYear(), date.value.getMonth(), props.value);
  } else if (props.type === 'prev') {
    return new Date(date.value.getFullYear(), date.value.getMonth() - 1, props.value);
  } else {
    return new Date(date.value.getFullYear(), date.value.getMonth() + 1, props.value);
  }
});

const openTodoList = () => {
  showTodoList.value = true;
};
const closeTodoList = () => {
  showTodoList.value = false;
};
const getTodos =
    () => {
  console.log('getTodos');
      axios
          .get(`${backUrl}/${cellDate.value}.json`)
          .then((response) => {
            if (response.data) {
              todos.value = Object.entries(response.data);
              console.log(todos.value);
            } else {
              todos.value = [];
            }
          });
    };
const postTodo = (newTodo: string) => {
  axios
      .post(`${backUrl}/${cellDate.value}.json`, {
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
          `${backUrl}/${cellDate.value}/${id}.json`
      )
      .then(() => {
        todos.value = todos.value.filter((todo: ITodoItem) => {
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
