import React, { useEffect, useState } from "react";
import CardComponent from "../cardComponent/CardComponent";
import { Button } from "@mui/material";
import CARD_IMAGES from "../cardImages/cardImages";
import "./CardBoard.css";

const CardBoard = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const resetGame = () => {
    const dealtCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstCard(null);
    setSecondCard(null);
    setCards(dealtCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);

      if (firstCard.src === secondCard.src) {
        setCards((oldCards) => {
          return oldCards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        const timeOut = setTimeout(reset, 1000);
        return () => {
          clearTimeout(timeOut);
        };
      }
    }
  }, [firstCard, secondCard]);

  const reset = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div>
      <h1>Memory Game</h1>
      <Button
        variant="contained"
        sx={{
          ":hover": {
            bgcolor: "secondary.main",
            color: "white",
          },
        }}
        onClick={resetGame}
      >
        New Game
      </Button>

      <div className="card-grid">
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstCard || card === secondCard || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <h2>Turns: {turns}</h2>
    </div>
  );
};

export default CardBoard;
