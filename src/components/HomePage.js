import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "./background.jpg";

// Card component with click functionality
const Card = ({ title, content, onClick }) => (
  <div
    style={{
      border: "2px solid skyblue",
      padding: "16px",
      margin: "16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontFamily: "cursive",
      color:"skyblue"
    }}
    onClick={onClick}
  >
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

// Parent component that renders multiple cards with click functionality
const HomePage = () => {
  const navigate = useNavigate();
  const cardsData = [
    {
      title: "Todo List",
      content: "Todo List takes care of your upcoming tasks.",
    },
    { title: "Notes Manager", content: "Notes Manager keeps your notes safe." },
  ];

  // State to store the selected card
  const [selectedCard, setSelectedCard] = useState(null);

  // Handle click event for each card
  const handleCardClick = (index) => {
    setSelectedCard(index);
    // Add your custom click functionality here
    if (index === 0) {
      navigate("/todo");
    } else if (index === 1) {
      navigate("/noteslist");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${background})`,
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h1 style={{ fontFamily: "cursive" , color:"skyblue"}}>Please Choose The Domain</h1>
        {/* Map through the data and render each card with click functionality */}
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
            onClick={() => handleCardClick(index)}
            style={{
              backgroundColor: selectedCard === index ? "#e0e0e0" : "red",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
