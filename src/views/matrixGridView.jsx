import React from "react";
import "../App.css";

export default function matrixGridView(props) {
  function LED(color, index) {
    return (
      <div
        key={index}
        onClick={clickOnLED}
        id={index}
        style={{ backgroundColor: `${color}` }}
        className="grid-item"
      ></div>
    );
  }
  function clickOnLED(event) {
    props.updateColor("red", event.target.id);
}
return <div className="container">{props.matrixGrid.map(LED)}</div>;

}
