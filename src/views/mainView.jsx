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
      {(props.openMobileGroup || (window.screen.width >= 1000)) ? <GroupMembers model={props.model} /> : console.log("meh")}
    </div>
  );
}

export default MainView;
