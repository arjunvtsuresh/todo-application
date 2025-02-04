import { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const API_URL = "http://127.0.0.1:5000/api/todos";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All"); // Options: "All", "Active", "Completed"
  const [error, setError] = useState(""); // Error state for feedback

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos. Please try again later.");
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError("Failed to add todo. Please try again.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (err) {
      setError("Failed to update todo. Please try again.");
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true; // Show all todos
  });

  return (
    <div className="container mt-4">
      <div className="card shadow p-3">
        {/* Error Feedback */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Filter Buttons */}
        <div className="btn-group mb-3">
          <button
            className={`btn ${filter === "All" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "Active" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setFilter("Active")}
          >
            Active
          </button>
          <button
            className={`btn ${filter === "Completed" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
        </div>

        {/* Add Todo Form */}
        <AddTodo onAdd={addTodo} />

        {/* Todo List */}
        <ul className="list-group">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
