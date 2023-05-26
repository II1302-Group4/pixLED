import React from "react";
import MatrixGridView from "../views/matrixGridView";

function matrixGridPresenter(props) {
  const [matrixGrid, setMatrixGrid] = React.useState(props.model.gridArray);
  const [chosenLed, setChosenLED] = React.useState(props.model.chosenLED);
  const [pickedColor, setPickedColor] = React.useState(
    props.model.paletteColor
  );
  const [snake, snakeMoved] = React.useState(props.model.snake);
  const [members, setMembers] = React.useState(props.model.members);
  const [user, setCurrentUser] = React.useState(props.model.currentUser);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setMatrixGrid(props.model.gridArray);
    setChosenLED(props.model.chosenLED);
    setMembers(props.model.members);
    setCurrentUser(props.model.currentUser);
    setPickedColor(props.model.paletteColor);
    snakeMoved(props.model.snake);
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

  if(props.model.gameIsOn){
    var intervalId = window.setTimeout(function(){
      props.model.snakeUpdate();
      console.log("Hiii")
    }, 100);
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

  function movementChange(key){
    let dir;
    switch(key){
      case 'w':
      case 'ArrowUp':
        dir = 4;
        break;
      case 's':
      case 'ArrowDown':
        dir = 2;
        break;
      case 'a':
      case 'ArrowLeft':
        dir = 3;
        break;
      case 'd':
      case 'ArrowRight':
        dir = 1;
        break;
      default:
        break;
    }
    if(dir % 2 === props.model.movementDir % 2){
      return;
    }
    props.model.movementDir = dir;
    console.log("The movement of the snake has changed!")
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
      model={props.model}
      movementChange={movementChange}
    />
  );
}

export default matrixGridPresenter;
