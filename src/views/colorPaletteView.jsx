import React from "react";
import "../App.css";
import submitIcon from "../assets/submit.png"

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
        <div className="window" id="colour-palette">
            <div className="title-bar">
                <div className="title-bar-text">PixLED Palette</div>
            </div>
            <div className="window-body">
                <div className="colorPalette-container">
                    {props.colorPaletteArray.map(color)}
                </div>
                <button
                    className="txt-btn"
                    onClick={submit}
                    disabled={
                        !(props.chosenLED && props.chosenColor) ||
                        props.timer != props.timeout
                    }
                >
                    {props.timer == props.timeout ? (
                        <img src={submitIcon} id="submit-icon"/>
                    ) : (
                        <span>{props.timer}</span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default colorPaletteView;