import React from "react";
import ColorPalleteView from "../views/colorPalleteView";

export default function colorPallete(props) {
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
  const [pickedColor, setPickedColor] = React.useState(
    props.model.palettecolor
  );

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setPickedColor(props.model.paletteColor);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  function chosenColor(color) {
    props.model.setPaletteColor(color);
  }

  return (
    <ColorPalleteView
      colorPaletteArray={colorPalette}
      colorPicked={chosenColor}
      pickedColor={pickedColor}
    />
  );
}
