import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTasks] = useState(null);

  useEffect(() => {
    const getTask = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/fernandorp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (data.msg) {
            createUser();
          } else {
            setTasks(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTask();
  }, []);

  useEffect(() => {
    const addTask = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/fernandorp", {
        method: "PUT",
        body: JSON.stringify(task),
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
    addTask();
  }, [task]);

  const createUser = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/fernandorp", {
      method: "POST",
      body: JSON.stringify([]),
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
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function addtarea(e) {
    if (e.key === "Enter" && e.target.value !== "" && task !== "") {
      let nT = [...task];
      let nE = {
        label: e.target.value,
        done: false,
      };
      let nTasks = nT.concat(nE);
      setTasks(nTasks);
      e.target.value = "";
    }
  }

  function deleteTask(e) {
    let taskUpdated = [];
    task.map((elem, index) => {
      if (index !== e) {
        taskUpdated.push(elem);
      }
      return taskUpdated;
    });

    setTasks(taskUpdated);
  }

  function deleteAll() {
    const deleteAllTasks = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/fernandorp", {
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
          //SetTasks([])
        })
        .catch((error) => {
          console.log(error);
        });
    };
    deleteAllTasks();
    setTasks([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>todo list - api <i class="fas fa-list"></i></h1>
        <div className="row">
          <ul className="list-group">
            <input
              type="text"
              className="form-control list-group-item mt-2"
              onKeyUp={addtarea}
            />
            {!!task &&
              task.map((elem, index) => {
                return (
                  <li
                    className="a form-control list-group-item d-inline-flex align-items-center"
                    id={index}
                    key={index}
                  >
                    <div className="list-group-item col-8 ">
                      {" "}
                      {elem.label}{" "}
                    </div>
                    <div className="b list-group-item ">
                      <span className="btn-danger opacity-75 border border-dark" onClick={() => deleteTask(index)} ></span>
                      </div>
                  </li>
                );
              })}
            <button className="btn-secondary opacity-50 border border-3" onClick={deleteAll}>Delete all</button>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
