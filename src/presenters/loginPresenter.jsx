import React from "react";
import LoginView from "../views/loginView";

function loginPresenter(props) {
  const [user, setCurrentUser] = React.useState(props.model.currentUser);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    setCurrentUser(props.model.currentUser);
  }

  function wasCreatedACB() {
    props.model.addObserver(observerACB);
    function isTakenDownACB() {
      props.model.removeObserver(observerACB);
    }
    return isTakenDownACB;
  }

  function signOut() {
    props.model.setMembers([]);
    props.model.selectLED(null);
    props.model.setCurrentUser(null);
  }

  return <span>{<LoginView user={user} signOut={signOut} />}</span>;
}

export default loginPresenter;
