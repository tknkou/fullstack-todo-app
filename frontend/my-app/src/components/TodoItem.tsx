import React from "react";
import { Todo } from "../types/todo";
import { TodoItemProps } from "../types/todo";

const TodoItem = ({ 
  todo,
  onDelete, 
  onToggleComplete, 
  onEdit
}: TodoItemProps) => {
  return (
    <li>
      <input 
        type="checkbox"
        checked={!!todo.completed_at}
        onChange={()=>onToggleComplete(todo.id)}
      />
      <strong
        style={{
          textDecoration: todo.completed_at ? "line-through": "none",
          marginLeft: "0.5rem",
        }}
      >
        {todo.title}
      </strong>
      {todo.description && <p>{todo.description}</p>}
      <button onClick={()=> onEdit(todo.id, {})}>Edit</button>
      <button onClick={()=>{onDelete(todo.id)}}>Delete</button>
    </li>
  );
};

export default TodoItem;