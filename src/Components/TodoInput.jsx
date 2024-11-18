import React from 'react';
import { useState, useEffect } from "react";
import todologo from "./todologo.png"

export default function TodoInput({setTodos, todos, ischecked, setischecked}) {

const [input , setInput] = useState("");

function enterTodo(e){
    setInput(e.target.value)
}

function addTodo(){
    if (input.trim() !== ''){

    setTodos([...todos, input]);
    setInput("");

}else{
    alert("Enter Todo");
}}

function handleKey(e){
    if(e.key === "Enter"){
        addTodo();
    }
}

function deleteAll(){
    setTodos([])
    localStorage.removeItem("todos");
    setischecked([])

}


  return (
      <div className="navbar">
    <div className="inputholder">
        <div className="icon">Organise<br/> your task</div>
        <div style={{display: "flex", alignItems: "center"}}>
      <input className="searchinput" type="text"
       placeholder="Enter Todo"
       value={input}
       onChange={enterTodo}
       onKeyDown={handleKey}
       />
       
       <button className="Add" onClick= {addTodo}>Add Todo</button>
       <button className="Add" onClick= {deleteAll} style={{marginLeft: "10px"}}>Delete All</button>
       </div>
       <div className={"link"}><a href="" target="_blank"> Source Code </a></div>
    </div>
    </div>

  )
}
