import "./App.css";
import MainPresenter from "./presenters/mainPresenter";
import TopBarPresenter from "./presenters/topBarPresenter";
import CreateGroup from "./presenters/createGroupPresenter.jsx";
import JoinGroup from "./presenters/joinGroupPresenter";
import GroupPage from "./presenters/groupPagePresenter";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <div className="top-bar">
                  <TopBarPresenter model={props.model} />
                </div>
                <div className="main-components">
                  <MainPresenter model={props.model} />
                </div>
              </>
            }
          />

          <Route
            path="createGroup"
            element={
              <div className="sidebar-components">
                <CreateGroup model={props.model} />
              </div>
            }
          />
          <Route
            path="invitation/:id"
            element={<JoinGroup model={props.model} />}
          />
          <Route
            path="groups/:id"
            element={<GroupPage model={props.model} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
