export const initialState = {
    items: [],
}

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            const existingItem = state.items.find((todo) => todo.id === action.payload.id);

            if (!existingItem) {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                }
            } else {
                return state;
            }
        case "REMOVE_TODO":
            return {
                ...state,
                items: state.items.filter((todo) => todo.id !== action.payload.id),
            };
        case "TOGGLE_TODO":
            return {
                ...state,
                items: state.items.map((todo) => {
                    return todo.id === action.payload.id
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo;
                })
            }
        case "UPDATE_TODO":
            return {
                ...state,
                items: state.items.map((todo) => {
                    return todo.id === action.payload.id
                        ? { ...todo, ...action.payload }
                        : todo
                })
            }
        default:
            return state;
    }
};

export default TodoReducer;