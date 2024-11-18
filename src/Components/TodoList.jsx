import React, {useEffect, useState} from 'react'

export default function TodoList({todos, setTodos, ischecked, setischecked}) {

    const [editedtodo, setEditedtodo] = useState(null);
    const [editingindex, seteditingindex]= useState(false);
   

    function deleteTodo(index){
       let updatedTodos = [];
       let updatedChecked = [];

       for(let i = 0; i< todos.length; i++){
           if(i !== index){
               updatedTodos.push(todos[i]);
               updatedChecked.push(ischecked[i]);
           }
       }
       setTodos(updatedTodos)
       setischecked(updatedChecked)
    }
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
      },[todos]);

    function editTodo(index){
        seteditingindex(index)
        setEditedtodo(todos[index])
    }

    function saveTodo(index){

        const updatedtodos = [...todos];
        updatedtodos[index] = editedtodo;
        setTodos(updatedtodos);
        seteditingindex(null);
        setEditedtodo('');
    }

    function handleCheckboxChange(index){
        setischecked((previschecked)=> {
            const newischecked = [...previschecked];
            const len = newischecked.length;
            newischecked[index] = !newischecked[index];
           
            return newischecked
        }) 
    }

    useEffect(() => {
        localStorage.setItem("checklist", JSON.stringify(ischecked))
      },[ischecked])
    

    let rounded = 0;

    if (todos.length > 0) {
      const completedTodos = ischecked.filter((isChecked) => isChecked).length;
      let progressPercentage = (completedTodos / todos.length) * 100;
      rounded = Math.floor(progressPercentage, 2);
    }else{
        progressPercentage = 0;
    }

  return (
    <div>
        
      <h2 style={{textAlign: "center", fontFamily: " Rampart One", boxShadow: "0px 5px 10px rgba(20, 145, 255, 0.101)", marginTop:" 40px", marginBottom: "40px"}}> Your Todo List </h2>
     <div style={{display: "flex",alignItems: "center", justifyContent: "center"}}>


     <div style={{ margin: '20px', height: '20px', background: '#eee', borderRadius: '5px', maxWidth: "200px", width: '100%' }}>
              <div
                style={{
                  height: '100%',
                  width: `${rounded}%`,
                  background: '#44bff8',
                  borderRadius: '5px',
                  transition: 'width 0.3s',
                }}
              ></div>
            </div>

     </div>
  
      <p style={{ textAlign: 'center', color: "green" }}>{rounded}% Completed</p>
     {rounded === 100 ?  (<p style={{ textAlign: 'center', color: "#44bff8", fontFamily: "Rampart One" }}>" Congratulations You Have Completed All your Tasks! "</p>) : (null)}
      {
          todos.map((todo, index) => (
              <div className="todolistcontainer">
              <div key={index} className= "todolistdiv">
              
              { editingindex === index ? (
                      <input
                      className={"searchinput"}
                      style={{height: "100%"}}
                      type="text"
                      value = {editedtodo}
                      onChange = {(e) => setEditedtodo(e.target.value)}
                      />
                  ): (<div style={{display: "flex"}}>
                      <input  type="checkbox" 
                      checked={ischecked[index] || false} 
                      style={{cursor: "pointer", marginRight: "20px"}}
                  onChange={() => handleCheckboxChange(index)} /> 
                  <p style = {ischecked[index] ? {color: "green"} : {color: "black"} }>{todo}</p>
                  </div>)}

              <div style={{marginLeft: "20%", display: "flex"}}>
             { editingindex !== index ? ( <button className="deletebutton" onClick={() => editTodo(index)}><img src={"https://img.icons8.com/?size=100&id=pzpApVcbIOwm&format=png&color=000000"} width="30px"/></button>)
                 :
             (<button className="deletebutton" onClick={() => saveTodo(index)}><img  src={"https://img.icons8.com/?size=100&id=SIUnfSbsfSmZ&format=png&color=000000"} width="30px"/></button>)}

              <button className= "deletebutton" onClick={() => deleteTodo(index)} ><img src= {'https://cdn.iconscout.com/icon/free/png-512/free-delete-icon-download-in-svg-png-gif-file-formats--recycle-bin-waste-ui-elements-pack-user-interface-icons-470378.png?f=webp&w=512'} width= "30px"/></button>
              </div>
              </div>
          </div>
          ))
      }
    </div>
  )
}


