import React from "react";
import MatrixGridView from "../views/matrixGridView";

function matrixGridPresenter(props) {
  const [matrixGrid, setMatrixGrid] = React.useState(props.model.gridArray);
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);
  const [pickedColor, setPickedColor] = React.useState(
    props.model.paletteColor
  );

  const [members, setMembers] = React.useState(props.model.members);
  const [user, setCurrentUser] = React.useState(props.model.currentUser);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMatrixGrid(props.model.gridArray);
    setChosenLED(props.model.chosenLED);
    setMembers(props.model.members);
    setCurrentUser(props.model.currentUser);
    setPickedColor(props.model.paletteColor);
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

  /**
   * Asks model to select a pixel
   * @param {int} ledNumber LED's index in the matrix array
   */
  function selectLED(ledNumber) {
    props.model.selectLED(ledNumber);
  }

  function uploadGridState(photoURL) {
    props.model.uploadImage(photoURL);
  }
  return (
    <MatrixGridView
      matrixGrid={matrixGrid}
      selectLED={selectLED}
      chosenLED={chosenLed}
      chosenColor={pickedColor}
      user={user}
      members={members}
      uploadGridState={uploadGridState}
    />
  );
}

export default matrixGridPresenter;
