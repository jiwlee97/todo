<template>
  <right-box>
    <h2>TodoList</h2>
    <h3>{{ year }} / {{ month }} / {{ dateOfDate }}</h3>
    <button class="close-button" @click="closeTodoList">X</button>
    <section>
      <form @submit.prevent="postTodo">
        <input type="text" placeholder="your todo!" v-model="todoText"/>
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

<script lang="ts" setup>
import RightBox from "./RightBox.vue";
import {ref, inject, Ref, computed, defineEmits, defineProps} from 'vue';

const todoText = ref('');

const date: Ref<Date> | undefined = inject('date');
if (date === undefined) {
  throw Error('Could not inject date.');
}
const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());

const emit = defineEmits(["close-todo-list", "post-todo", "delete-todo"]);
const props = defineProps(['dateOfDate', 'todos']);

const closeTodoList = () => {
  emit("close-todo-list");
};
const postTodo = () => {
  if (todoText.value.trim()) {
    emit("post-todo", todoText.value);
    todoText.value = "";
  }
};
const deleteTodo = (id: string) => {
  emit("delete-todo", id);
}
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
