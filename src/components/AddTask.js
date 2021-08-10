import React, { useEffect, useState } from 'react';


const AddTask = () => {
    
 const { task, setTask } = useState(null);

 useEffect (() => {
  const createTask = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR01',{
      method:'POST',
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },

    })
    .then(resp => resp.json())
    .then(data => setTask(data))
    .catch(error => console.log(error))
  }
  const getTask = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR01')
    .then ( resp => resp.json())
    .then ( data => {data.msg ? createTask() : setTask(data)})
    .catch( error => console.log(error))
  }
  getTask();
 },[])

const addNewTask = (currentTask) =>{
  fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR01',{
      method:'POST',
      body: JSON.stringify(currentTask),
      headers: {
        "Content-Type": "application/json",
      },

    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log("echale un ojo a..." + error ))
} 

const addTarea = e => {
  const {value} = e.target;
    if(e.key === "Enter" && e.target.value !== "" && task !== ""){
        let currentTask = {
          "label": value,
          "done": false
        }
        setTask([...task, currentTask])
        e.target.value = "";
        addNewTask(task)

        }
       
}
const deleteTask = indexArray => {
  let newTasks = [];
  task.map((item,index) => {
    if(index !== indexArray){
      newTasks.push(item)
    }
    return newTasks;
  })   
    setTask(newTasks)
 }

 const deleteAll = () =>{
   const deleteAllTask = () => {
       fetch("https://assets.breatheco.de/apis/fake/todos/NNGR01", {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
       })
         .then((resp) => {
           console.log(resp.ok);
           console.log(resp.status);
           console.log(resp.text());
           return resp.json();
         })
         .then((data) => {
           console.log(data);
         })
         .catch((error) => {
           console.log(error);
         });
     };
     deleteAllTask();
     setTask([])
 }



 



  return (
      <>
    <div className="row">
      <div className="col-md-6 mx-auto">
        <input className="col-md-12 mx-auto" placeholder="nueva tarea" onKeyUp={addTarea} />
      </div>
    </div>

    <div className="row" >
    <div className="col-6 mx-auto mt-2" id="taskcontainer">
        <ul className="list-group">
          {task === null ? "Espere un momento" : task.map((item, index) => {
            return (
        <li className="row list-group-item d-inline-flex align-items-center" id={index} key={index}>
          <div className="col-10">{item.label}</div>
<button type="button" className="btn btn-warning" onClick={() => deleteTask(index)}>Delete All Tasks</button>
          </li>

            )
          })}
        </ul>
    </div>
</div>
</>
  );
};

export default AddTask;
