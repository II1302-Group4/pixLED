import React from "react";
import MatrixGridView from "../views/matrixGridView";

function matrixGridPresenter(props) {
  const [matrixGrid, setMatrixGrid] = React.useState(props.model.gridArray);
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMatrixGrid(props.model.gridArray);
    setChosenLED(props.model.chosenLED);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
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
      selectLED={selectLED}
      chosenLED={chosenLed}
    />
  );
}

export default matrixGridPresenter;
