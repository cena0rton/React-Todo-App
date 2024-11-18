import React, {useEffect, useState} from 'react'
import { TodoInput, TodoList, Lander} from "./Components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

const App = () => {
  const [ischecked, setischecked]= useState(()=>{
    
      const check = localStorage.getItem("checklist");
      return check ? JSON.parse(check) : [];

  });

  const [todos, setTodos] = useState(()=>{

    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];

  });

  return (
    <div>
        <TodoInput setTodos={setTodos} todos={todos} ischecked={ischecked} setischecked={setischecked}/>
        {todos.length === 0 ?( <Lander/> ) : (<TodoList todos={todos} setTodos={setTodos} ischecked={ischecked} setischecked={setischecked}/>) }
    </div>
  )
}

export default App
