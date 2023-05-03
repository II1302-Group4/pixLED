import MatrixGridPresenter from "../presenters/matrixGridPresenter";
import ColorPalettePresenter from "../presenters/colorPalettePresenter";
import { useNavigate } from "react-router-dom";
function MainView(props) {
  const navigate = useNavigate();
  function createGroup() {
    navigate("/createGroup");
  }
  return (
    <div>
      <div className="grid">
        <MatrixGridPresenter model={props.model} />
      </div>

      <div className="colorPalette">
        <ColorPalettePresenter model={props.model} />
      </div>
      <button onClick={createGroup}>Create a group</button>
    </div>
  );
}

export default MainView;
