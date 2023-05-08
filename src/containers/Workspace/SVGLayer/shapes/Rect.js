import React from "react";

const Rect = ({
  id,
  x,
  y,
  width,
  height,
  fillColor,
  borderColor,
  borderWidth,
  filter,
}) => {
  return (
    <rect
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fillColor}
      stroke={borderColor}
      strokeWidth={borderWidth}
      filter={filter}
    />
  );
};

export default Rect;
