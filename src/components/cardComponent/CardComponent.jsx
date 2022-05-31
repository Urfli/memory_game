import React from "react";
import "./CardComponent.css";

const CardComponent = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front"></img>
        <img
          className="back"
          src="/card_Images/card-back1.png"
          onClick={handleClick}
          alt="card back"
        ></img>
      </div>
    </div>
  );
};

export default CardComponent;
