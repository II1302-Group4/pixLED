import React from "react";
import "../App.css";

export default function matrixGridView(props) {
  console.log(props.members);
  function logThis() {
    console.log("hej");
  }
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

  function submit() {
    props.updateColor(props.chosenColor, props.chosenLED);
  }
  return (
    <>
      <div className="container">{props.matrixGrid.map(LED)}</div>
      <button
        className="txt-btn"
        onClick={submit}
        disabled={
          !(props.chosenLED && props.chosenColor) ||
          props.timer != props.timeout ||
          !props.isLoggedIn
        }
      >
        {props.timer == props.timeout ? (
          <span>Submit</span>
        ) : (
          <span>{props.timer}</span>
        )}
      </button>
    </>
  );
}
