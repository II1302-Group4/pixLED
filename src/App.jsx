import "./App.css";
import { useState } from "react";
import MainPresenter from "./presenters/mainPresenter";
import MatrixGrid from "./presenters/matrixGridPresenter";

function App(props) {
  return (
    <>
      <MainPresenter />;
      <MatrixGrid model={props.model} />
    </>
  );
}

export default App;
