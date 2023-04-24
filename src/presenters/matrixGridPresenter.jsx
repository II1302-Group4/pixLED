import React from "react";
import MatrixGridView from "../views/matrixGridView";

export default function MatrixGrid(props) {
  const [matrixGrid, setMatrixGrid] = React.useState(props.model.gridArray);
  const [pickedColor, setPickedColor] = React.useState(
    props.model.paletteColor
  );
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMatrixGrid(props.model.gridArray);
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

  function updateColor(color, ledNumber) {
    console.log(color);
    console.log(ledNumber);
    props.model.updateColorInDatabase(color, ledNumber);
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
    />
  );
}
