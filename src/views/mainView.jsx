import MatrixGridPresenter from "../presenters/matrixGridPresenter";
import ColorPalettePresenter from "../presenters/colorPalettePresenter";
import { useNavigate } from "react-router-dom";
import GroupMembers from "../presenters/groupMembersPresenter";


function MainView(props) {
  const navigate = useNavigate();

  function createGroup() {
    navigate("/createGroup");
  }

  return (
    <div className="main">
      <div className="grid">
        <MatrixGridPresenter model={props.model} />
      </div>

      <div className="colorPalette">
        <ColorPalettePresenter model={props.model} />
      </div>
      {props.openMobileGroup ? <GroupMembers model={props.model} /> : null }
    </div>
  );
}

export default MainView;
