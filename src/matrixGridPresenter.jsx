import React from "react";
import MatrixGridView from "./matrixGridView";

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

  return <MatrixGridView matrixGrid={matrixGrid} updateColor={updateColor} />;
}
