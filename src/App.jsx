import "./App.css";
import { useState } from "react";
import MainPresenter from "./presenters/mainPresenter";
import MatrixGrid from "./presenters/matrixGridPresenter";

function App() {
  return (
    <>
      <MainPresenter />;
      <MatrixGrid />
    </>
  );
}

export default App;
