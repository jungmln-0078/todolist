<template>
  <div id="nav">
    <p>{{ completedTodos }}</p>
    <input type="text" v-model="inputValue" @keypress.enter="addTodo">
    <button @click="addTodo">Add</button>
    <div id="todolist" v-for="todo in todoList" :key="todo.id">
      <todo :id="todo.id" :text="todo.text" />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { toRefs } from 'vue'
import todo from './components/todo.vue';
export default {
  components: { todo },
  setup() {
    const store = useStore();
    const state = reactive({
      todoList: [],
      inputValue: null,
      completedTodos: computed(() => store.getters.completedTodos)
      });
    const addTodo = () => {
      if (state.inputValue) {
        store.commit('addTodo', {id: state.todoList.length, text: state.inputValue, isDone: false});
        state.inputValue = "";
        loadState();
      }
    }
    const loadState = () => {
      state.todoList = store.state.todoList;
    }
    return { ...toRefs(state), addTodo, loadState }
  },
}
</script>