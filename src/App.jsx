import "./App.css";
import MainPresenter from "./presenters/mainPresenter";
import TopBarPresenter from "./presenters/topBarPresenter";
import CreateGroup from "./presenters/createGroupPresenter.jsx";

import JoinGroup from "./presenters/joinGroupPresenter";
import About from "./views/aboutView";
import History from "./presenters/historyPresenter";
import Profile from "./presenters/profilePresenter";
import Team from "./presenters/teamPresenter";
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
                <div className="side-bar">
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

          <Route path="about" element={<About />} />
          <Route path="history" element={<History model={props.model} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="team" element={<Team model={props.model} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
