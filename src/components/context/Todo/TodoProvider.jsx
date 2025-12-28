import { useReducer } from "react";
import { initialState } from "../../redux/Slice/Todo/TodoSlice";
import TodoReducer from "./TodoReducer";
import TodoContext from "../Todo/TodoContext";

const TodoProvider = ({ children }) => {

    const [state, dispatch] = useReducer(TodoReducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;