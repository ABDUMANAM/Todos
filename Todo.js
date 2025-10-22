import { configureStore, createSlice } from '@reduxjs/toolkit'


let Id = 0;


const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Id++, text: action.payload });
    },
        editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    clearAll: () => []
  }
});

export const { addTodo,editTodo, removeTodo, clearAll } = todoSlice.actions;


const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  }
});

export default store;