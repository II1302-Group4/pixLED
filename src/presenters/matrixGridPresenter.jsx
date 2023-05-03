import React from "react";
import MatrixGridView from "../views/matrixGridView";

function matrixGridPresenter(props) {
  const [matrixGrid, setMatrixGrid] = React.useState(props.model.gridArray);
  const [pickedColor, setPickedColor] = React.useState(
    props.model.paletteColor
  );
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);
  const initialTimer = props.model.timer;
  const [timer, setTimer] = React.useState(initialTimer);
  const [sumbit, setSumbit] = React.useState(false);
  const timeoutId = React.useRef(null);
  const [timeout] = React.useState(15);
  const [members, setMembers] = React.useState(props.model.members);
  const [user, setCurrentUser] = React.useState(props.model.currentUser);

  const countTimer = React.useCallback(() => {
    if (timer <= 0) {
      setTimer(timeout);
      setSumbit(false);
    } else {
      if (sumbit) {
        setTimer(timer - 1);
        props.model.updateTimer(timer);
      }
    }
  }, [timer, sumbit]);

  React.useEffect(() => {
    timeoutId.current = window.setTimeout(countTimer, 1000);
    // cleanup function
    return () => window.clearTimeout(timeoutId.current);
  }, [timer, countTimer]);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMatrixGrid(props.model.gridArray);
    setPickedColor(props.model.paletteColor);
    setChosenLED(props.model.chosenLED);
    setMembers(props.model.members);
    setCurrentUser(props.model.currentUser);
  }

  function wasCreatedACB() {
    window.addEventListener("beforeunload", function (e) {
      selectLED(null);
    });
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      selectLED(null);
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  function updateColor(color, ledNumber) {
    props.model.updateColorInDatabase(color, ledNumber);
    setSumbit(true);
  }

  /**
   * Asks model to select a pixel
   * @param {int} ledNumber LED's index in the matrix array
   */
  function selectLED(ledNumber) {
    props.model.selectLED(ledNumber);
  }

  return (
    <MatrixGridView
      matrixGrid={matrixGrid}
      updateColor={updateColor}
      selectLED={selectLED}
      chosenLED={chosenLed}
      chosenColor={pickedColor}
      timer={timer}
      timeout={timeout}
      user={user}
      members={members}
    />
  );
}

export default matrixGridPresenter;
