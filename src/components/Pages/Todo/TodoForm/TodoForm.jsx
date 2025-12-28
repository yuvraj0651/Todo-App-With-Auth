import { useEffect, useRef, useState } from "react";

const TodoForm = ({ addTodoHandler, setAddTask, addTask, editTodo }) => {

    const handleAddChange = (e) => {
        setAddTask(e.target.value);
    };

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 mx-auto mt-8">
            <h2 className="text-xl font-[500] text-gray-800 mb-4">Add a New Task</h2>
            <form onSubmit={addTodoHandler} className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    name="addInput"
                    value={addTask}
                    onChange={handleAddChange}
                    ref={inputRef}
                    placeholder="Enter your task..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg transition focus:outline-none"
                />
                {/* Status Select (Static UI) */}
                <div className="flex flex-col sm:flex-row">
                    <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="select status">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 font-semibold ${editTodo ? "bg-pink-600 hover:bg-pink-700" : "bg-indigo-600"}`}
                >
                    {editTodo ? "Update Task" : "Add Task"}
                </button>
            </form>
        </div>
    );
};

export default TodoForm;
