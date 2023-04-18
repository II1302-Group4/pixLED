import "./App.css";
import { useState } from "react";
import MainPresenter from "./presenters/mainPresenter";
import MatrixGrid from "./matrixGridPresenter";

function App(props) {
  return (
    <>
      <MainPresenter />;
      <MatrixGrid model={props.model} />
    </>
  );
}

export default App;
