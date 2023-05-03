import React from "react";
import TopBarView from "../views/topBarView";

function topBarPresenter(props) {
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
  return (
    <div>
      <TopBarView user={user} model={props.model} />
    </div>
  );
}

export default topBarPresenter;
