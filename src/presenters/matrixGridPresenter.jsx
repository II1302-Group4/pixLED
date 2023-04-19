import React from "react";
import MatrixGridView from "../views/matrixGridView";

export default function MatrixGrid(props) {
  const [matrixGrid, setMatrixGrid] = React.useState(props.model.gridArray);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMatrixGrid(props.model.gridArray);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  function updateColor(color, ledNumber) {
    props.model.updateColorInDatabase(color, ledNumber);
  }
  
  /**
   * Asks model to select a pixel
   * @param {int} ledNumber LED's index in the matrix array
   */
  function selectLED(ledNumber) {
    props.model.selectLED(ledNumber)
  }

  return <MatrixGridView matrixGrid={matrixGrid} updateColor={updateColor} selectLED={selectLED} chosenLED={props.model.chosenLED}/>;
}
