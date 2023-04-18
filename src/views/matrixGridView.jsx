import React from "react";
import "../App.css";

export default function matrixGridView(props) {
  function makeMatrix() {
    props.makeMatrix(64, 64);
  }

  return (
    <div className="container">
      <div onClick={makeMatrix}>Click on this to create the matrix</div>
    </div>
  );
}
