import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  //logout function
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={"/profile/" + JSON.parse(auth)._id}>profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav_right">
          <li>
            {" "}
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Nav;
