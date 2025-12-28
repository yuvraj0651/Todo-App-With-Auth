import TodoForm from '../TodoForm/TodoForm'
import TodoList from '../TodoList/TodoList'

const TodoApp = ({ addTask, setAddTask, addTodoHandler, editTodo, todos, dispatch, setEditTodo }) => {
    return (
        <div>
            <TodoForm
                addTask={addTask}
                setAddTask={setAddTask}
                addTodoHandler={addTodoHandler}
                editTodo={editTodo}
            />
            <TodoList
                todos={todos}
                dispatch={dispatch}
                setEditTodo={setEditTodo}
            />
        </div>
    )
}

export default TodoApp