import React from "react";
import "../App.css";

export default function colorPallete(props) {
  function Color(color, index) {
    if (color == props.pickedColor) {
      return (
        <div
          key={index}
          id={color}
          style={{ backgroundColor: `${color}` }}
          className="chosen-item"
        ></div>
      );
    }
    return (
      <div
        key={index}
        onClick={clickOnColor}
        id={color}
        style={{ backgroundColor: `${color}` }}
        className="grid-item"
      ></div>
    );
  }
  function clickOnColor(event) {
    props.colorPicked(event.target.id);
  }

  return (
    <div className="window" id="test">
      <div className="title-bar">
        <div className="title-bar-text">PixLED Palette</div>
      </div>
      <div className="window-body">
        <div className="colorPalette-container">
          {props.colorPaletteArray.map(Color)}
        </div>
      </div>
      <button>hello world</button>
    </div>
  );
}
