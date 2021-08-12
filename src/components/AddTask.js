import React, { useEffect, useState } from 'react';

const AddTask = () => {

  const { task, setTask } = useState(null);

  useEffect(() => {

    const getTask = () => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR',{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => resp.json())
      .then(data =>  data.msg ? createUser() : setTask(data))
      .catch(error => console.log(error))
}
   getTask();
},[])

useEffect( () => {

  const putTask = () =>{
    fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR',{
      method: 'PUT',
      body: JSON.stringify(task),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then( resp => resp.json())
    .then(data => console.log(data))
    .catch( error => console.log(error))
  }
  putTask();
},[task])
 
const createUser = () => {
  fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR',{
    method: 'POST',
    body: JSON.stringify([]),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then( resp => resp.json())
  .then(data => setTask(data))
  .catch(error => console.log(error))
}

function addTarea(e){
  if(e.key === "Enter" && e.target.value !== "" && task !== ""){
    let nT = [...task];
    let nE = {
      lable: e.target.value,
      done: false
    }
   let nTask = nT.concat(nE);
       setTask(nTask);
       e.target.value = "";
  }
}
function deleteTask(e){
  let taskUpdate = [];
  task.map((elem, index) => {
    if(index !== e){
      taskUpdate.push(elem)
    }
    return taskUpdate
  })
  setTask(taskUpdate)
}

function deleteAll(){
  const deleteAllTask = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/NNGR',{
      method: 'DETELE',
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then( resp => resp.json())
    .then (data => console.log(data))
    .catch(error => console.log(error))
  }
  deleteAllTask();
  setTask([])
}


return (

<div className="row">
<div className="input-group mb-3">
  <input type="text" className="form-control"
  onKeyUp={addTarea}
  />
  <ul className="list-group">
  {!!task &&
                            task.map((elem, index) => {
                                return (<div className="row" id={index} key={index}>
                                    <div className="col-11" >{elem.label}</div>
                                    <div className="col-1"><span className=" far fa-trash-alt" onClick={()=> deleteTask(index)}></span></div>
                                </div>
                                )
                            })
                        }
  </ul>
</div>
  <button className="btn-warning col-md-1 mx-auto pt-2"></button>
</div>

)

}

export default AddTask;