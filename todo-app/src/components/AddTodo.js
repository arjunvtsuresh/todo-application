import { useState } from "react";

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");  // For displaying validation error

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input Validation
    if (!title.trim()) {
      setError("Todo title cannot be empty.");
      return;
    }

    // Reset error if validation passes
    setError("");
    onAdd(title);  // Call the parent function to add the todo
    setTitle("");  // Clear the input after adding the todo
  };

  return (
    <div>
      <form className="d-flex mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit" className="btn btn-primary ms-2">Add</button>
      </form>

      {/* Error message */}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default AddTodo;
