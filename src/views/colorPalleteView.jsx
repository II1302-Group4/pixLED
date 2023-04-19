import React from "react";
import "../App.css";

export default function colorPallete(props) {
    function Color(color, index) {
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

    return <div className="colorPalette-container">{props.colorPaletteArray.map(Color)}</div>;    
}


