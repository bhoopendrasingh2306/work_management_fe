import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const url =`https://work-management-be.onrender.com/signup`;
  const [name, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  },[]);

  const collectiondata = () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }

    console.log({ name, email, password });
    // axios is used to send data from UI to database or from react to database  .then is used to resolve promise
    axios
      .post(url, { name, email, password })
      .then((result) => {
        console.log(result); // result contain the response comming from axios
        if (result) {
          console.log("hellow");
          //this will store the result into the local storage while sign up
          localStorage.setItem("user", JSON.stringify(result.data.data));
          localStorage.setItem("token", JSON.stringify(result.data.auth));
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  //this effect will restrict to user to access signup page after once he logged in. it will redirect him to "/"

  return (
    <div className="bg">
      <div className="login">
        <h1>Signup :)</h1>
        <input
          className="inputbox"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setText(e.target.value)}
          value={name}
        />
        {error && !name && (
          <span className="invalid-input">Please Enter Username</span>
        )}
        <input
          className="inputbox"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {error && !email && (
          <span className="invalid-input">Please Enter Email</span>
        )}
        <input
          className="inputbox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        {error && !password && (
          <span className="invalid-input">Please Enter Password</span>
        )}
        <Button className="loginbtn" type="button" onClick={collectiondata}>
          Signup
        </Button>
      </div>
    </div>
  );
}

export default Signup;
