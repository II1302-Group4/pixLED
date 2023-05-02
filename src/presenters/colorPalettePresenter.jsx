import React from "react";
import ColorPaletteView from "../views/colorPaletteView";

function colorPalettePresenter(props) {
  const colorPaletteArray = [
    "#FFFFFF",
    "#C0C0C0",
    "#808080",
    "#000000",
    "#FF0000",
    "#800000",
    "#FFFF00",
    "#808000",
    "#00FF00",
    "#008000",
    "#00FFFF",
    "#008080",
    "#0000FF",
    "#000080",
    "#FF00FF",
    "#800080",
  ];

  const [colorPalette] = React.useState(colorPaletteArray);
  const [pickedColor, setPickedColor] = React.useState(props.model.paletteColor);
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);
  const initialTimer = props.model.timer;
  const [timer, setTimer] = React.useState(initialTimer);
  const [submit, setSubmit] = React.useState(false);
  const timeoutId = React.useRef(null);
  const [timeout] = React.useState(15);

  const countTimer = React.useCallback(() => {
    if (timer <= 0) {
      setTimer(timeout);
      setSubmit(false);
    } else {
      if (submit) {
        setTimer(timer - 1);
        props.model.updateTimer(timer);
      }
    }
  }, [timer, submit]);
  
  React.useEffect(() => {
    timeoutId.current = window.setTimeout(countTimer, 1000);
    // cleanup function
    return () => window.clearTimeout(timeoutId.current);
  }, [timer, countTimer]);

  React.useEffect(wasCreatedACB, []);
  
  function observerACB() {
    setPickedColor(props.model.paletteColor);
    setChosenLED(props.model.chosenLED);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  function selectColor(color) {
    props.model.setPaletteColor(color);
  }

  function updateColor(color, ledNumber) {
    props.model.updateColorInDatabase(color, ledNumber);
    setSubmit(true);
  }

  return (
    <ColorPaletteView
      colorPaletteArray={colorPalette}
      colorPicked={selectColor}
      updateColor={updateColor}
      chosenLED={chosenLed}
      chosenColor={pickedColor}
      timer={timer}
      timeout={timeout}
      isLoggedIn={props.isLoggedIn}
    />
  );
}

export default colorPalettePresenter;