<template>
  <div id="todo">
      <input type="text" v-if="editing" v-model="display">
      <span :class="checked ? 'done' : ''" v-else>{{ display }}</span>
      <button @click="editTodo" :disabled="checked">Edit</button>
      <button @click="deleteTodo" :disabled="checked">Delete</button>
      <input type="checkbox" :checked="checked" @click="checkTodo" :disabled="editing">
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
    props: {
        id: Number,
        text: String
    },
    setup(props) {
        const store = useStore();
        const state = reactive({
            display: null,
            checked: false,
            editing: false
        });
        const editTodo = () => {
            if (!state.editing) {
                state.editing = true;
                state.display = props.text === state.display ? props.text : state.display;
            } else {
                state.editing = false;
                store.commit('editTodo', { id: props.id, text: state.display });
            }
        }
        const deleteTodo = () => {
            store.commit('deleteTodo', { id: props.id });
        }
        const checkTodo = () => {
            store.commit('checkTodo', { id: props.id });
            state.checked = store.state.todoList.find(t => t.id === props.id).isDone;
        }
        onMounted(() => {
            state.display = props.text;
        })
        return { ...toRefs(state), editTodo, deleteTodo, checkTodo }
    }
}
</script>