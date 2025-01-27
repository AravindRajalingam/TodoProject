import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(true);
  const [changes, setChanges] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [initial, setInitial] = useState(true);
  const [updateMsg, setUpdateMsg] = useState(false);

  useEffect(() => {
    fetchData();
    setChanges(false);
  }, [success, changes]);

  const fetchData = () => {
    try {
      fetch("http://localhost:8000/todoGet")
        .then((response) => (response.ok ? response.json() : setError(false)))
        .then((response) => setTodos(response));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (title !== "" && description !== "") {
      fetch("http://localhost:8000/todoPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }).then((response) => {
        if (response.ok) {
          setTitle("");
          setDescription("");
          setSuccess(true);
          setTimeout(setSuccess, 3000, false);
        }
      });
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    try {
      fetch(`http://localhost:8000/todoDelete/${id}`, {
        method: "DELETE",
      }).then((response) =>
        response.ok ? setChanges(true) : setChanges(false)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, title, description) => {
    setEdit(true);
    setEditId(id);
    setTitle(title);
    setInitial(false);
    setDescription(description);
  };

  const handleUpdate = (id) => {
    try {
      fetch(`http://localhost:8000/todoUpdate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }).then((response) =>
        response.ok ? setChanges(true) : setChanges(false)
      );
      setUpdateMsg(true);
      setTimeout(setUpdateMsg, 3000, false);
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setDescription("");
      setEdit(false);
      setInitial(true);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark p-4">
            <ul className="navbar-nav">
              <li className="nav-item text-light">TODO APPLICATION</li>
            </ul>
          </nav>
        </div>
      </div>

      {initial && (
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-bold m-3">Add Tasks</h1>
          </div>
          {success && (
            <p className="text-success mt-2">Task added successfully!!</p>
          )}
          <div className="row mt-4">
            <div className="col-6">
              <input
                className="form-control"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Title"
                value={title}
                id="title_id"
              />
            </div>
            <div className="col-6">
              <input
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Description"
                value={description}
                id="decription_id"
              />
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-12">
              <button className="btn btn-success m-3" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-danger m-3" onClick={handleReset}>
                Reset
              </button>
            </div>
            {!error && (
              <div className="d-flex flex-column">
                <p className="text-danger">Server connection error!!</p>
              </div>
            )}
          </div>
        </div>
      )}
      {updateMsg && (
        <p className="text-success mt-2">Task updated successfully!!</p>
      )}
      {edit && (
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-bold m-3">Update Task</h1>
          </div>
          <div className="row mt-4">
            <div className="col-4">
              <input
                className="form-control"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Title"
                value={title}
                id="title_id"
              />
            </div>
            <div className="col-4">
              <input
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Description"
                value={description}
                id="decription_id"
              />
            </div>
            <div className="col-4">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(editId)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <ul className="list-group">
          {todos.map((item) => (
            <li className="list-group-item bg-primary text-light d-flex justify-content-between mt-3">
              <div className="d-flex flex-column">
                <span>
                  <strong>{item.title}</strong>
                </span>
                <span>{item.description}</span>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-warning m-2"
                  onClick={() =>
                    handleEdit(item.id, item.title, item.description)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
