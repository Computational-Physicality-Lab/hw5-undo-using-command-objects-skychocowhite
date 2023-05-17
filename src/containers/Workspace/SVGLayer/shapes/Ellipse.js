import React from "react";

const Ellipse = ({
  id,
  cx,
  cy,
  rx,
  ry,
  fillColor,
  borderColor,
  borderWidth,
  filter,
}) => {
  return (
    <ellipse
      id={id}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fillColor}
      stroke={borderColor}
      strokeWidth={borderWidth}
      filter={filter}
    />
  );
};

export default Ellipse;
