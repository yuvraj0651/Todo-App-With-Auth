import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    todoItems: JSON.parse(localStorage.getItem("todos")) || [],
};

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const existingItem = state.todoItems.find((todo) => todo.id === action.payload.id);

            if (!existingItem) {
                state.todoItems.push({ ...action.payload, isCompleted: false });
            };
        },
        removeTodo: (state, action) => {
            state.todoItems = state.todoItems.filter((todo) => todo.id !== action.payload.id);
        },
        toggleTodo: (state, action) => {
            state.todoItems = state.todoItems.map((todo) => {
                return todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
            });
        },
        updateTodo: (state, action) => {
            const { id, ...updates } = action.payload;

            state.todoItems = state.todoItems.map((todo) => {
                return todo.id === id ? { ...todo, ...updates } : todo;
            });
        },
        reorderTodos: (state, action) => {
            state.todoItems = action.payload;
        },
    },
});

export const {
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    reorderTodos,
} = TodoSlice.actions;

export default TodoSlice.reducer;