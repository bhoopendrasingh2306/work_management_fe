import React, { useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import background from './background.jpg';
import { useEffect } from 'react';
import axios from 'axios';




// Card component with click functionality
const Card = ({ title, content, onClick }) => (
  <div
    style={{ border: '2px solid skyblue', padding: '16px', margin: '16px', borderRadius: '8px', cursor: 'pointer', fontFamily:"cursive" }}
    onClick={onClick}
  >
    <h2>{title}</h2>
    {content}
  </div>
);

// Parent component that renders multiple cards with click functionality
const NotesList = () => {
    const navigate = useNavigate();
    const [cardsData , setcardsData] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(()=>{
        getNotes(userId);
    },[]);

    // getting notes list
    const getNotes= (id)=>{
      const headers = {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      };
        axios.get(`https://work-management-be.onrender.com/get/notes/${id}`, {headers:headers})
        .then((result)=>{
            // console.log(result.data.length);
              setcardsData(result.data);
        })
        .catch((err)=>{console.log(err)});
    }

    // redirectig to adding notes page
    const AddNote = () =>{
        navigate("/noteseditor")
    }

    const handleCardClick = (id) =>{
      navigate(`/updatenotes/${id}`)
    }


  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200vh', backgroundImage: `url(${background})`  }}>
      <div style={{ maxWidth: '800px', width: '100%'  , marginTop:"-300px"}}>       
        <h1 style={{ fontFamily:"cursive", marginTop:"20px" }}>Your Saved Notes</h1>
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.filename}
            content={card.text}
            onClick={()=>handleCardClick(card._id)} 
          />
        ))}
            <button className='button-50' onClick={AddNote}>Add New Notes</button>
      </div>
    </div>
    </>
  );
};

export default NotesList;