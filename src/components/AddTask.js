import React, { useEffect, useState } from "react";

const AddTask = () => {
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
    <div className="row">
      <div className="input-group input-group-lg">
        <input type="text" className="form-control" onKeyUp={addtarea} />
        <ul className="list-group">
          {!!task &&
            task.map((elem, index) => {
              return (
                <div className="row list-group-item d-inline-flex align-items-center" id={index} key={index}>
                  <div className="col-9">{elem.label}</div>
                  <div className="col-1 btn">
                    <span
                    type="button"
                      className="btn btn-danger  text-end"
                      onClick={() => deleteTask(index)}
                    ></span>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
      <button
        className="btn-warning col-md-1 mx-auto pt-2"
        onClick={deleteAll}
      ></button>
    </div>
  );
};

export default AddTask;
