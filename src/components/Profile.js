import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setuserId] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [imgurl, setimgurl] = useState("");
  const params = useParams();
  const storageuserId = JSON.parse(localStorage.getItem('user'))._id;


  useEffect(() => {
    console.log("parii", params);
    getProfile();
    // getprofileImage(storageuserId);
  }, []);

  const getProfile = () => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    console.log(params);
    axios
      .get(`http://localhost:4000/profile/${params.id}`, { headers: headers })
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setuserId(result.data._id);
        setimgurl(result.data.img_url);
      });
  };

  const upload = () => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    
    
      axios
      .put(`http://localhost:4000/profile/${params.id}`, formData, {
        headers: headers,
      })
      .then((result) => {
        if (result) {
          getProfile();
        }
      })
      .catch((err) => console.log(err));
      
    
    
  };


  return (
    <div className="bg">
      <div className="profile">
        <h1>User Profile</h1>
        <input
          type="text"
          className="inputbox"
          readOnly
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        ></input>
        <input
          type="text"
          className="inputbox"
          readOnly
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        ></input>
        <input
          type="text"
          className="inputbox"
          readOnly
          onChange={(e) => {
            setuserId(e.target.value);
          }}
          value={userId}
        ></input>
        <span className="profile_message">Upload Profile Picture</span>
        <br></br>
        <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
        <button type="button" onClick={upload}>
          uploadFile
        </button>
        <span className="img_message">{message}</span>
        <br></br>
        <br></br>
        <div className="image_of_profile">
          <img src={imgurl} alt="profileimage" className="profileimage"></img>
        </div>
      </div>
    </div>
  );
}

export default Profile;
