import React from "react";

const Brick = props => {
  const classes = ["brick"];
  classes.push(`brick-${props.row}-${props.col}`);
  return (
    <div
      className={classes.join(" ")}
      style={{ backgroundColor: props.bgColor }}
    />
  );
};

export default Brick;
