// import React, {useState} from "react";

import { useEffect, useState } from "react";
import { Todo, TodoListProps} from "../types/todo";
import TodoItem from "./TodoItem";
import EditTodoForm from "./EditTodoForm";
import AddTodoForm from "./AddTodoForm";

const TodoList=({token}:TodoListProps)=>{
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // 仮の初期データ
  const dummyTodos: Todo[] = [
  {
    id: "1",
    user_id: "mock-user-id-kohei",
    title: "勉強する",
    description: "Reactの復習",
    due_date: null,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id-admin",
    title: "買い物",
    description: "牛乳とパン",
    due_date: null,
    completed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
  setTodos(dummyTodos);
    // fetch("http://localhost:8080/todos", {
    //   headers: {Authorization: `Bearer ${token}`},
    // })
    // .then((res) => res.json())
    // .then((data) => setTodos(data));
  }, [])

  const addHandler = () =>{
    //タイトルが空なら何もしない
    if(!title.trim()) return;
    const newTodo: Todo= {
      id: crypto.randomUUID(),           // 仮ID（サーバー未使用なのでOK）
    user_id: "mock-user-id",           // 仮ユーザー
    title,
    description: description || null,
    due_date: null,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos])
    setTitle("");
    setDescription("");
  }

  const handleDelete = (id: string) => {
    setTodos((prev) => 
      prev.filter((todo) => todo.id !== id)
    )
  }

  const handleToggleComplete = (id : string) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? {
      ...todo, 
      completed_at: todo.completed_at ? null : new Date().toISOString(),
    } : todo));
    setEditingId(null);
  }

  const handleEdit = (id: string, updated: Partial<Todo> ) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? {
      ...todo, ...updated
    }: todo
  ))
  }
  return (
    <div>
      <h2>Todo List</h2>
        <AddTodoForm
          onAdd={addHandler}
        />
      <ul>
        {todos.map((todo) => 
        editingId === todo.id ? (
          <EditTodoForm
            key={todo.id}
            todo={todo}
            onSave={handleEdit}
            onCancel={()=>setEditingId(null)}
          />
        ) : (
          <TodoItem
            key={todo.id} 
            todo={todo}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onEdit={()=>setEditingId(todo.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList;

