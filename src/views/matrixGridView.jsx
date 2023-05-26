import React, { useRef } from "react";
import html2canvas from "html2canvas";
import "../App.css";

export default function matrixGridView(props) {
  const componentRef = useRef(null);

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
      // let members = props.members;
      // members.shift();
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
              boxShadow: `0.1vw 0.1vw 0.8vw 0.8vw ${memberHasChosen.color}`,
              backgroundColor: `${color}`,
            }}
            className="member-chosen-item"
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
    if(!props.model.gameIsOn){
      props.selectLED(event.target.id);
    }
  }

  function handleKeyPress(event) {
    if(props.model.gameIsOn){
      props.movementChange(event.key);
    } else {
      console.log(props.chosenLED)
      let nextLED = props.chosenLED;
      switch(event.key){
        case 'w':
        case 'ArrowUp':
          if(parseInt(props.chosenLED) < 64){
            nextLED = parseInt(props.chosenLED) + 4032;
          } else {
            nextLED = parseInt(props.chosenLED) - 64;
          }
          break;
        case 's':
        case 'ArrowDown':
          if(parseInt(props.chosenLED) > 4031){
            nextLED = parseInt(props.chosenLED) - 4032;
          } else {
            nextLED = parseInt(props.chosenLED) + 64;
          }
          break;
        case 'a':
        case 'ArrowLeft':
          if(parseInt(props.chosenLED) % 64 === 0){
            nextLED = parseInt(props.chosenLED) + 63;
          } else {
            nextLED = parseInt(props.chosenLED) - 1;
          }
          break;
        case 'd':
        case 'ArrowRight':
          if(parseInt(props.chosenLED) % 64 === 63){
            nextLED = parseInt(props.chosenLED) - 63;
          } else {
            nextLED = parseInt(props.chosenLED) + 1;
          }
          break;
        default:
          break;
      }
      props.selectLED(nextLED);
    }
  }

  const takeScreenshot = () => {
    html2canvas(componentRef.current).then(async (canvas) => {
      const screenshotUrl = canvas.toDataURL("image/png");
      props.uploadGridState(screenshotUrl);
    });
  };

  const downloadImage = () => {
    html2canvas(componentRef.current).then(async (canvas) => {
      const screenshotUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "grid.png";
      link.href = screenshotUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };



  return (
    <>
      <div
        className="window"
        data-title="Select pixel"
        data-intro="Select a pixel on the canvas that you want to modify "
        data-step="1"
      >
        {props.user ? null : (
          <div className="login-alert">
            <div>Login to participate</div>
          </div>
        )}
        <div className="title-bar">
          <div className="title-bar-text">PixLED grid</div>
        </div>
        <div className="window-body" onKeyUp={handleKeyPress} tabIndex={1} >
          <div ref={componentRef} className="container">
            {props.matrixGrid.map(LED)}
          </div>
        </div>
        {props.members[0]?.name == props.user?.name ? (
          <button onClick={takeScreenshot}>Upload Grid State</button>
        ) : null}
        <button onClick={downloadImage}>Download Grid State</button>
      </div>
    </>
  );
}