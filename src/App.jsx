import "./App.css";
import { useState, useEffect } from "react";
import { auth } from "./firebaseModel";
import MainPresenter from "./presenters/mainPresenter";
import TopBarPresenter from "./presenters/topBarPresenter";
import CreateGroup from "./presenters/createGroupPresenter.jsx";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  RouterProvider,
  Navigate,
} from "react-router-dom";
function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
                  <TopBarPresenter
                    model={props.model}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
                <div className="main-components">
                  <MainPresenter model={props.model} isLoggedIn={isLoggedIn} />
                </div>
              </>
            }
          />

          <Route
            path="createGroup"
            element={
              <div className="sidebar-components">
                <CreateGroup model={props.model} isLoggedIn={isLoggedIn} />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
