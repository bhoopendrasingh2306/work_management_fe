import React from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNotes = () => {
  const [filename, setFilename] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log("paramterefasdfs", params);
    prefill();
  }, []);

  const prefill = () => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    axios
      .get(`http://localhost:4000/notes/update/${params.id}`, {
        headers: headers,
      })
      .then((result) => {
        setFilename(result.data.filename);
        setText(result.data.text);
      });
  };

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  //updating  note
  const handleUpdate = () => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    axios
      .put(
        `http://localhost:4000/notes/update/${params.id}`,
        { filename, text },
        { headers: headers }
      )
      .then((result) => {
        console.log(result);
        navigate("/noteslist");
      });
  };

  function setTextvalue(val) {
    setText(val);
  }

  const handleBack=()=>{
    navigate("/noteslist")
  }

  const handleDelete = ()=>{
    const headers = {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      };
      axios.delete(`http://localhost:4000/notes/delete/${params.id}`, {headers:headers})
      .then((result)=>{
        console.log(result)
        navigate("/noteslist")
      })
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Text To Your Notes</h1>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          value={text}
          onChange={setTextvalue}
          style={{ height: "220px" }}
        ></ReactQuill>
        <input
          className="input_filename"
          type="text"
          onChange={(e) => setFilename(e.target.value)}
          value={filename}
          placeholder="Notes Heading or File Name"
        ></input>
        <button className="button-50" onClick={handleUpdate}>
          {" "}
          UPDATE
        </button>
        <button className="button-50" onClick={handleDelete}>
          {" "}
          DELETE
        </button>
        <button className="button-50" onClick={handleBack}>
          {" "}
          BACK
        </button>
      </div>
    </div>
  );
};

export default UpdateNotes;
