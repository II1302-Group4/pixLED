import React from "react";
import ColorPaletteView from "../views/colorPaletteView";

function colorPalettePresenter(props) {
  const colorPaletteArray = [
    "#FFFFFF",
    "#000000",
    "#0040ff",
    "#f5e507",
    "#ff0000",
    "#ff9100",
    "#40ff00",
    "#90f556",
    "#f20597",
    "#b705f2",
    "#f07df0",
    "#7de4f0",
    "#616161",
    "#c4c0c0",
    "#eda1c5",
    "#1b1f61",
  ];

  const [colorPalette] = React.useState(colorPaletteArray);
  const [pickedColor, setPickedColor] = React.useState(
    props.model.paletteColor
  );
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);
  const initialTimer = props.model.timer;
  const [timer, setTimer] = React.useState(initialTimer);
  const [submit, setSubmit] = React.useState(false);
  const timeoutId = React.useRef(null);
  const [timeout] = React.useState(15);
  const [user, setCurrentUser] = React.useState(props.model.currentUser);

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
    setCurrentUser(props.model.currentUser);
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
      user={user}
    />
  );
}

export default colorPalettePresenter;
