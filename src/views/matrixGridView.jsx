import React from "react";
import "../App.css";

export default function matrixGridView(props) {
  function makeMatrix() {
    hideButton();
    props.makeMatrix(64, 64);
  }
  function hideButton() {
    document.getElementById("showMatrixButton").style.display="none";
    
  }

  return (
    <div className="container">
      <button id="showMatrixButton" onClick={makeMatrix}>click me!</button>
    </div>
  );
}
