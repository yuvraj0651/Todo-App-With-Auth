import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    todos: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Getting or Fetching the API

export const fetchTodosData = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
            if (!response.ok) {
                throw new Error("Sorry something went wrong in fetching the api");
            };
            let data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error: ", error.message);
            return rejectWithValue(error.message);
        };
    },
);

// Adding the Todo in API

export const addTodoData = createAsyncThunk(
    "todos/addTodo",
    async (newTodoText, { rejectWithValue }) => {
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodoText),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while adding data to api");
            };
            let data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error: ", error.message);
            return rejectWithValue(error.message);
        };
    },
);

// Delete Todos from API

export const deleteTodoFromData = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Something went wrong while deleting data from api")
            };
            return id;
        } catch (error) {
            console.log("Error: ", error.message);
            return rejectWithValue(error.message);
        };
    },
);

// Updating the API

export const updateTodoData = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while updating data from api")
            };
            let data = await response.json();
            console.log(data);
            return { id, data };
        } catch (error) {
            console.log("Error: ", error.message);
            return rejectWithValue(error.message);
        };
    },
);

export const ApiThunk = createSlice({
    name: "todos",
    initialState,
    extraReducers: (builder) => {
        // Fetching the data
        builder.addCase(fetchTodosData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchTodosData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.todos = action.payload;
        })
        builder.addCase(fetchTodosData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Something went wrong";
        })
        // Adding the data to Api
        builder.addCase(addTodoData.pending, (state) => {
            state.addLoading = true;
            state.error = null;
        })
        builder.addCase(addTodoData.fulfilled, (state, action) => {
            state.addLoading = false;
            state.error = null;
            state.todos.push(action.payload);
        })
        builder.addCase(addTodoData.rejected, (state, action) => {
            state.addLoading = false;
            state.error = action.payload || "Something went wrong";
        });
        // Deleting the data from Api
        builder.addCase(deleteTodoFromData.pending, (state) => {
            state.deleteLoading = true;
            state.error = null;
        })
        builder.addCase(deleteTodoFromData.fulfilled, (state, action) => {
            state.deleteLoading = false;
            state.error = null;
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        })
        builder.addCase(deleteTodoFromData.rejected, (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload || "Something went wrong";
        })
        // Updating the data from Api
        builder.addCase(updateTodoData.pending, (state) => {
            state.updateLoading = true;
            state.error = null;
        })
        builder.addCase(updateTodoData.fulfilled, (state, action) => {
            state.updateLoading = false;
            state.error = null;
            state.todos = state.todos.map((todo) => todo.id === action.payload.id
                ? { ...todo, ...action.payload.data } : todo);
        })
        builder.addCase(updateTodoData.rejected, (state, action) => {
            state.updateLoading = false;
            state.error = action.payload || "Something went wrong";
        })
    },
});

export default ApiThunk.reducer;