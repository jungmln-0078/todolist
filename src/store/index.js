import { createStore } from 'vuex'

export default createStore({
  state: {
    todoList: []
  },
  mutations: {
    addTodo(state, payload) {
      state.todoList.push(payload);
    },
    deleteTodo(state, payload) {
      let idx = state.todoList.findIndex(t => t.id == payload.id);
      state.todoList.splice(idx, 1);
    },
    editTodo(state, payload) {
      let idx = state.todoList.findIndex(t => t.id == payload.id);
      state.todoList[idx].text = payload.text;
    },
    checkTodo(state, payload) {
      let idx = state.todoList.findIndex(t => t.id == payload.id);
      state.todoList[idx].isDone = !state.todoList[idx].isDone;
    }
  },
  actions: {
  },
  getters: {
    completedTodos(state) {
      let cnt = 0;
      state.todoList.map(t => { if(t.isDone) cnt++; });
      return cnt;
    }
  }
})
