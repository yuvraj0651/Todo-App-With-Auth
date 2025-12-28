import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
import TodoForm from './components/Pages/Todo/TodoForm/TodoForm'
import TodoList from './components/Pages/Todo/TodoList/TodoList'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from './components/redux/Slice/Todo/TodoSlice'
import { fetchTodosData } from './components/API/Thunk/ApiThunk'
import TodoProvider from './components/context/Todo/TodoProvider'
import InitialPage from './components/Pages/Todo/InitialPage/InitialPage'
import { Route, Routes } from 'react-router'
import TodoApp from './components/Pages/Todo/TodoApp/TodoApp'
import ProtectedRoutes from './components/Routes/ProtectedRoutes'

function App() {

  const [addTask, setAddTask] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const todos = useSelector((state) => state.todo.todoItems);
  console.log(todos);

  let dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodosData());
  // }, [dispatch])

  const addTodoHandler = (e) => {
    e.preventDefault();

    if (!addTask.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: addTask,
    };

    if (editTodo) {
      dispatch(updateTodo({
        id: editTodo.id,
        text: addTask,
      }))
      alert("Todo List Updated Successfully");
      setEditTodo(null);
    } else {
      dispatch(addTodo(newTodo));
      alert("New Todo Task Added");
    }
    setAddTask("");
  };

  useEffect(() => {
    if (editTodo) {
      setAddTask(editTodo.text)
    }
  }, [editTodo]);

  return (
    <>
      <TodoProvider>
        {/* Header Section */}
        <Header />
        {/* Main Section */}
        <main>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path='/todo' element={
              <ProtectedRoutes>
                <TodoApp
                  addTask={addTask}
                  setAddTask={setAddTask}
                  addTodoHandler={addTodoHandler}
                  editTodo={editTodo}
                  todos={todos}
                  dispatch={dispatch}
                  setEditTodo={setEditTodo}
                />
              </ProtectedRoutes>
            } />
          </Routes>
        </main>
        {/* Footer Section */}
        <Footer />
      </TodoProvider>
    </>
  )
}

export default App
