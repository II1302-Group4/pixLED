import React, { createRed } from "react";
import "../App.css";
import {useScreenshot, createFileName } 

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
      let memberHasChosen = null;
      props.members.forEach((member) => {
        if (member.previewLEDIndex == index) {
          memberHasChosen = member;
        }
      });
      if (memberHasChosen) {
        return (
          <div
            key={index}
            onClick={clickOnLED}
            id={index}
            style={{
              boxShadow: `1px 1px 8px 8px ${memberHasChosen.color}`,
              backgroundColor: `${color}`,
            }}
            className="chosen-item"
          ></div>
        );
      } else {
        return (
          <div
            key={index}
            onClick={clickOnLED}
            id={index}
            style={{
              backgroundColor: `${color}`,
            }}
            className="grid-item"
          ></div>
        );
      }
    }
  }
  function clickOnLED(event) {
    props.selectLED(event.target.id);
  }

  return (
    <div className="window" id="grid-window">
      <div className="title-bar">
        <div className="title-bar-text">PixLED grid</div>
      </div>
      <div className="window-body">
        <div className="container">{props.matrixGrid.map(LED)}</div>
      </div>
    </div>
  );
}
