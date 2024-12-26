import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo(state, action) {
            state.push(action.payload);
        },
        deleteTodo(state, action) {
            return state.filter((todo) => todo.id !== action.payload);
        },
        editTodo(state, action) {
            const { id, newTitle } = action.payload;
            const todo = state.find((todo) => todo.id === id);
            if (todo) {
                todo.todoName = newTitle;
            }
        },
    },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
    },
});
