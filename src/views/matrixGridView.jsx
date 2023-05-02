import React from "react";
import "../App.css";

export default function matrixGridView(props) {
    function LED(color, index) {
        if (index == props.chosenLED && props.chosenColor) {
            return (
                <div
                    key={index}
                    id={index}
                    style={{ backgroundColor: `${props.chosenColor}` }}
                    className="chosen-item"
                ></div>
            );
        } else if (index == props.chosenLED) {
            return (
                <div
                    key={index}
                    id={index}
                    style={{ backgroundColor: `${color}` }}
                    className="chosen-item"
                ></div>
            );
        } else {
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
    }
    function clickOnLED(event) {
        props.selectLED(event.target.id);
    }

    return (
        <div>
            <div className="container">{props.matrixGrid.map(LED)}</div>
        </div>
    );
}
