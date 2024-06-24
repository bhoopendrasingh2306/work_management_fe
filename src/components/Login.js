import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [out, setOut] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((result) => {
        console.log("server output is", result);
        if (result.data.auth) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("token", JSON.stringify(result.data.auth));
          navigate("/");
        } else {
          setOut(result.data.result);
        }
      });
  };

  return (
    <div className="bg">
      <div className="login">
        <h1>Login :)</h1>
        <input
          className="inputbox"
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="inputbox"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="loginbtn" type="button" onClick={handleLogin}>
          Login
        </button>
        <h4>{out}</h4>
      </div>
    </div>
  );
};

export default Login;
