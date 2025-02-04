function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? "text-decoration-line-through" : ""}>
          {todo.title}
        </span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
