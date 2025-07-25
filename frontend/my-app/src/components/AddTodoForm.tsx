import React, { useState } from "react";
import { AddTodoFormProps } from "../types/todo";

const AddTodoForm = ({onAdd} : AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if(!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };
  // フォーム処理など
  return (
    <div>
      <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description(optional)"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}  
      />
      <br />
      <button onClick={handleSubmit}>追加</button>
    </div>
  )
};

export default AddTodoForm;