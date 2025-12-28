import { useEffect, useState } from "react";
import { removeTodo, reorderTodos, toggleTodo } from "../../../redux/Slice/Todo/TodoSlice";

const TodoList = ({ todos, dispatch, setEditTodo }) => {

    const [activeTab, setActiveTab] = useState("all");
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [draggedOverItemIndex, setDraggedOverItemIndex] = useState(null);

    const draggedItemStart = (id) => {
        setDraggedItemIndex(id);
    };

    const draggedOverEnter = (id) => {
        setDraggedOverItemIndex(id);
    };

    useEffect(() => {
        console.log("Dragged Item:", draggedItemIndex, "Dragged Over:", draggedOverItemIndex);
    }, [draggedItemIndex, draggedOverItemIndex]);

    const draggedItemEnd = () => {
        if (draggedItemIndex === null || draggedOverItemIndex === null) return;
        const items = [...todos];

        const fromIndex = items.findIndex((todo) => todo.id === draggedItemIndex);
        const toIndex = items.findIndex((todo) => todo.id === draggedOverItemIndex);

        const [movedItem] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, movedItem);

        dispatch(reorderTodos(items));
        setDraggedItemIndex(null);
        setDraggedOverItemIndex(null);
    }

    const deleteTodoHandler = (id) => {
        dispatch(removeTodo({ id }));
    };

    const toggleTodoHandler = (id) => {
        dispatch(toggleTodo({ id }));
    };

    // FILTER LOGIC
    const filteredTodos =
        activeTab === "all"
            ? todos
            : activeTab === "pending"
                ? todos.filter(todo => !todo.isCompleted)
                : todos.filter(todo => todo.isCompleted);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 mx-auto mt-6">

            {/* NAV TABS */}
            <div className="flex gap-6 border-b mb-6">
                {["all", "pending", "completed"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 flex-1 capitalize font-semibold transition
                            ${activeTab === tab
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* TODO LIST */}
            <ul className="space-y-3">
                {filteredTodos.length === 0 ? (
                    <h4 className="text-center font-semibold text-red-600">
                        No todos found
                    </h4>
                ) : (
                    filteredTodos.map((todo) => (
                        <li
                            key={todo.id}
                            draggable
                            onDragStart={() => draggedItemStart(todo.id)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                draggedOverEnter(todo.id)
                            }}
                            onDragEnd={draggedItemEnd}
                            className="flex justify-between items-center px-4 py-3 border rounded-lg hover:bg-gray-50 transition overflow-scroll"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    onChange={() => toggleTodoHandler(todo.id)}
                                    className="accent-pink-600"
                                />
                                <span className={`text-gray-800 ${todo.isCompleted ? "line-through opacity-70" : ""}`}>
                                    {todo.text}
                                </span>

                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-md text-white
                                        ${todo.isCompleted ? "bg-green-600" : "bg-amber-500"}`}
                                >
                                    {todo.isCompleted ? "Completed" : "Pending"}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setEditTodo(todo)}
                                    className="text-amber-600 hover:text-amber-700 font-semibold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTodoHandler(todo.id)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TodoList;
