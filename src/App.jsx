import "./App.css";
import { useState } from "react";
import MainPresenter from "./presenters/mainPresenter";
import MatrixGrid from "./presenters/matrixGridPresenter";
import ColorPallete from './presenters/colorPalettePresenter';

function App(props) {
  return (
    <>
      <MainPresenter />;
      <MatrixGrid model={props.model} />
      <ColorPallete  model={props.model}/>
    </>
  );
}

export default App;
