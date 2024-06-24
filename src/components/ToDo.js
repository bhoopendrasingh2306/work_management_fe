import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ToDo = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    todoList(userId);
    console.log("userId====>",userId);
  },[]);

  const todoList = (id) => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    axios
      .get(`https://work-management-be.onrender.com/todo/get/${id}`, { headers: headers })
      .then((result) => {
        console.log(result.data);
        setList(result.data);
      });
  };

  const deleteTodo = (id) => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    axios
      .delete(`https://work-management-be.onrender.com/todo/add/${id}`, { headers: headers })
      .then((result) => {
        if (result) {
          todoList(userId);
        }
      });
  };

  const handleAdd = () => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    if (!text) {
      setError("Enter Something to Add");
    } else
      axios
        .post(
          "https://work-management-be.onrender.com/todo/add",
          { text, userId, check: false },
          { headers: headers }
        )
        .then((result) => {
          console.log(result);
          setMessage("Task Added Successfully");
          todoList(userId);
          setText("");
        });
  };

  const handleSave = (e) => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    e.preventDefault();
    console.log("value of e", e.target.checked);

    axios
      .put(
        `https://work-management-be.onrender.com/todo/add/${e.target.value}`,
        { check: e.target.checked },
        { headers: headers }
      )
      .then((result) => {
        todoList(userId);
        console.log("updated result", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg2">
      <div className="add_todo">
        <h1 className="todo_heading"> TODO LIST </h1>
        <input
          className="add_input"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></input>
        <button className="add_button" type="button" onClick={handleAdd}>
          ADD
        </button>
        <span className="unvalid-input">{error}</span>
        <span className="valid-input">{message}</span>
      </div>
      <div className="todo-list">
        <ul>
          <li>S.No</li>
          <li>checkbox</li>
          <li>Todo</li>
          <li>Operation</li>
          <li>id</li>
        </ul>

        {list.length > 0 ? (
          list.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>
                <input
                  type="checkbox"
                  checked={item.check}
                  onChange={handleSave}
                  value={item._id}
                ></input>
              </li>
              <li>{item.text}</li>
              <li>
                <button
                  onClick={() => {
                    deleteTodo(item._id);
                  }}
                >
                  Delete
                </button>
              </li>
              <li hidden:true>{item._id}</li>
            </ul>
          ))
        ) : (
          <h1>No Resultt Found</h1>
        )}
      </div>
      {/* <button className="save_button" type="button">
        SAVE
      </button> */}
    </div>
  );
};

export default ToDo;
