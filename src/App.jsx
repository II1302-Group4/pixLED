import "./App.css";
import { useState, useEffect } from "react";
import { auth } from "./firebaseModel";
import MainPresenter from "./presenters/mainPresenter";
import TopBarPresenter from "./presenters/topBarPresenter";

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
      <div className="top-bar">
        <TopBarPresenter 
          model={props.model}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="main-components">
        <MainPresenter 
          model={props.model}
          isLoggedIn={isLoggedIn}  
        />
      </div>
    </div>
  );
}

export default App;
