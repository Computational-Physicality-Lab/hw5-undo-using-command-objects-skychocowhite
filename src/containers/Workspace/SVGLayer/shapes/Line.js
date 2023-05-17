import React from "react";

const Line = ({ id, x1, x2, y1, y2, borderColor, borderWidth, filter }) => {
  return (
    <line
      id={id}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={borderColor}
      strokeWidth={borderWidth}
      filter={filter}
    />
  );
};

export default Line;