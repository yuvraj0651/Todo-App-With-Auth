import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../Slice/Todo/TodoSlice";
import ThunkReducer from "../../API/Thunk/ApiThunk";
import { ApiQuery } from "../../API/Query/ApiQuery";
import AuthReducer from "../../API/Thunk/AuthThunk";

const store = configureStore({
    reducer: {
        todo: TodoReducer,
        todoData: ThunkReducer,
        authData: AuthReducer,

        [ApiQuery.reducerPath]: ApiQuery.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ApiQuery.middleware);
    }
});

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    localStorage.setItem("todos", JSON.stringify(state.todo.todoItems));
})

export default store;