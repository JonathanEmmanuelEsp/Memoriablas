import React from "react";

const emojiMap = {
  2: { left: "🧸", right: "🍯" },
  3: { left: "🐝", right: "🌸" },
  4: { left: "🐶", right: "🦴" },
  5: { left: "🐱", right: "🐟" },
  6: { left: "🐰", right: "🥕" },
  7: { left: "👦", right: "🍬" },
  8: { left: "👧", right: "🍦" },
  9: { left: "🐵", right: "🍌" },
  10: { left: "🦎", right: "☀️" },
};

export const Card = ({ value, isFlipped, onClick, side, table }) => {
  const emoji = emojiMap[table]?.[side] || "🎁";
  const colorClass = `kids-card-${side}-t${table}`;
  return (
    <div
      className={`kids-card${isFlipped ? " kids-card-flipped" : ""} kids-card-${side} ${colorClass}`}
      onClick={onClick}
    >
      <div className="kids-card-inner">
        <div className="kids-card-front">{emoji}</div>
        <div className="kids-card-back">{value}</div>
      </div>
    </div>
  );
};
