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
    props.selectLED(event.target.id);
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
        id="grid-window"
        data-title="Select pixel"
        data-intro="Select a pixel on the canvas that you want to modify "
        data-step="1"
      >
        <div className="title-bar">
          <div className="title-bar-text">PixLED grid</div>
        </div>
        <div className="window-body">
          <div ref={componentRef} className="container">
            {props.matrixGrid.map(LED)}
          </div>
        </div>
        {props.members[0]?.name == props.user?.name ? (
          <button onClick={takeScreenshot}>Upload Grid State</button>
        ) : null}
        <button onClick={downloadImage}>Download Grid State</button>  
      </div>
      <span className="artist-tag">Background artwork by @grabrela_arts</span>
    </>
  );
}
