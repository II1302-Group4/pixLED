import React from "react";
import "../App.css";
import checkboxIcon from "../assets/checkbox.png";
import crossIcon from "../assets/cross.png";

function colorPaletteView(props) {
  function color(color, index) {
    if (color == props.chosenColor) {
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

  function submit() {
    props.updateColor(props.chosenColor, props.chosenLED);
  }

    return (
        <div className="window" id="colour-palette" data-title='Choose colour' data-intro='Colour your selected pixel' data-step='2'>
        <div className="title-bar">
          <div className="title-bar-text">PixLED Palette</div>
        </div>
        <div className="window-body">
          <div className="colorPalette-container">
            {props.colorPaletteArray.map(color)}
          </div>
          <button
            onClick={submit}
            data-title='Submit'
            data-intro='Submit your changes' data-step='3'
            className={(props.chosenLED && props.chosenColor) ? "checkbox-enabled" : "checkbox-disabled"}
            disabled={!(props.chosenLED && props.chosenColor) || props.timer != props.timeout}
          >
            {
            props.timer == props.timeout ? (
              props.chosenColor && props.chosenLED ? (
                <img src={checkboxIcon} id="checkbox-icon" />
              ) : (
                <img src={crossIcon} id="cross-icon" />
              )
            ) : (
              <span>{props.timer}</span>
            )
            }
          </button>
        </div>      
    </div>
  );
}

export default colorPaletteView;
