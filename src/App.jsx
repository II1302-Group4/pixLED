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
        <TopBarPresenter model={props.model}/>
      </div>
      <div className="main-components">
        <MainPresenter model={props.model}/>
      </div>

      {/* <div className="top-bar">
        <GoogleLogin isLoggedIn={isLoggedIn} />
        <MainPresenter /> 
      </div> 
      <div className="main-components">
      <MatrixGrid model={props.model} isLoggedIn={isLoggedIn}/>
      <ColorPallete model={props.model} />
      </div> */}
    </div>
  );
}

export default App;
