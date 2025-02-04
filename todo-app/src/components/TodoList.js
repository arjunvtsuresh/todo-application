import { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const API_URL = "http://127.0.0.1:5000/api/todos";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  const addTodo = async (title) => {
    const response = await axios.post(API_URL, { title });
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (id) => {
    const response = await axios.put(`${API_URL}/${id}`);
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-3">
        <AddTodo onAdd={addTodo} />
        <ul className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
