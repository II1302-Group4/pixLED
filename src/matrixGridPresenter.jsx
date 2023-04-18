import React from "react";
import MatrixGridView from "./matrixGridView";

export default function MatrixGrid(props) {
  function matrixMake(rows, cols) {
    const container = document.querySelector(".container");
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    for (let c = 0; c < rows * cols; c++) {
      let cell = document.createElement("div");
      cell.style.backgroundColor = "white";
      container.appendChild(cell);
    }

    const grid = container.querySelectorAll("div");

    for (let i = 0; i < grid.length; i++)
      grid[i].addEventListener("click", function onHover() {
        grid[i].style.backgroundColor = "red";
      });
  }

  return <MatrixGridView makeMatrix={matrixMake} />;
}
