import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import Header from "./components/Header";
import "./login-home.css";

export default function App() {
  const [table, setTable] = useState(2);
  const [cardsLeft, setCardsLeft] = useState([]);
  const [cardsRight, setCardsRight] = useState([]);
  const [flippedLeft, setFlippedLeft] = useState(null);
  const [flippedRight, setFlippedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(
    Number(localStorage.getItem("memoriablas_score")) || 0
  );
  const successAudio = new Audio("/success.mp3");

  useEffect(() => {
    const questions = Array.from(
      { length: 10 },
      (_, i) => `${table} x ${i + 1}`
    );
    const answers = Array.from({ length: 10 }, (_, i) => table * (i + 1));
    setCardsLeft(shuffleArray(questions));
    setCardsRight(shuffleArray(answers));
    setMatchedPairs([]);
  }, [table]);

  const shuffleArray = (arr) => arr.slice().sort(() => Math.random() - 0.5);

  const handleLeftClick = (index) => {
    if (!matchedPairs.some((m) => m.left === index)) {
      setFlippedLeft(index);
    }
  };
  const handleRightClick = (index) => {
    if (!matchedPairs.some((m) => m.right === index)) {
      setFlippedRight(index);
    }
  };

  useEffect(() => {
    if (flippedLeft !== null && flippedRight !== null) {
      const leftValue = cardsLeft[flippedLeft];
      const rightValue = cardsRight[flippedRight];
      const [a, _, b] = leftValue.split(" ");
      const result = parseInt(a) * parseInt(b);
      if (result === rightValue) {
        setMatchedPairs((prev) => [
          ...prev,
          { left: flippedLeft, right: flippedRight },
        ]);
        successAudio.play();
        const newScore = score + 1;
        setScore(newScore);
        localStorage.setItem("memoriablas_score", newScore);
      }
      setTimeout(() => {
        setFlippedLeft(null);
        setFlippedRight(null);
      }, 1000);
    }
  }, [flippedLeft, flippedRight]);

  const resetGame = () => {
    const questions = Array.from(
      { length: 10 },
      (_, i) => `${table} x ${i + 1}`
    );
    const answers = Array.from({ length: 10 }, (_, i) => table * (i + 1));
    setCardsLeft(shuffleArray(questions));
    setCardsRight(shuffleArray(answers));
    setMatchedPairs([]);
    setFlippedLeft(null);
    setFlippedRight(null);
  };

  const isGameCompleted = matchedPairs.length === 10;

  return (
    <>
      <Header />
      <div className="app kids-app">
        <h1 className="kids-title">🎈 Memoriablas 🎈</h1>
        <div className="kids-controls">
          <label className="kids-label">Escoge tabla:</label>
          <select
            className="kids-select"
            value={table}
            onChange={(e) => setTable(parseInt(e.target.value))}
          >
            {[...Array(9).keys()].map((n) => (
              <option key={n} value={n + 2}>
                {n + 2}
              </option>
            ))}
          </select>
        </div>
        <div className="kids-score">🌟 Puntos: {score}</div>
        <div className="kids-board">
          <div className="kids-cards-column">
            {cardsLeft.map((value, index) => {
              const isFlipped =
                flippedLeft === index ||
                matchedPairs.some((pair) => pair.left === index);
              return (
                <Card
                  key={index}
                  value={value}
                  isFlipped={isFlipped}
                  onClick={() => handleLeftClick(index)}
                  side="left"
                  table={table}
                />
              );
            })}
          </div>
          <div className="kids-cards-column">
            {cardsRight.map((value, index) => {
              const isFlipped =
                flippedRight === index ||
                matchedPairs.some((pair) => pair.right === index);
              return (
                <Card
                  key={index}
                  value={value}
                  isFlipped={isFlipped}
                  onClick={() => handleRightClick(index)}
                  side="right"
                  table={table}
                />
              );
            })}
          </div>
        </div>
        {isGameCompleted && (
          <div className="kids-congrats">
            🎉 <b>¡Felicidades!</b> Completaste todas las coincidencias 🎉
            <br />
            <button className="kids-btn" onClick={resetGame}>¡Jugar de nuevo!</button>
          </div>
        )}
      </div>
    </>
  );
}
