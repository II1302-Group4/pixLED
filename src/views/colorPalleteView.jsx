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
        <div class="window" id="test">
            <div class="title-bar">
                <div class="title-bar-text">PixLED Palette</div>
            </div>
            <div class="window-body">
                <div class="colorPalette-container">
                    {props.colorPaletteArray.map(Color)}
                </div>
            </div>
            <button class="txt-btn">Submit</button>
        </div>
    );
}
