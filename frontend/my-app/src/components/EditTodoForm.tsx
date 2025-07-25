import { useState } from "react";
import { Todo } from "../types/todo";
import { EditTodoFormProps } from "../types/todo";

const EditTodoForm = ({todo, onSave, onCancel}: EditTodoFormProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const handleSubmit = () => {
    onSave(todo.id,{
      title,
      description: description || null
    }); 
    onCancel();
  };
  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
      <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
      />
      <br />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditTodoForm;
