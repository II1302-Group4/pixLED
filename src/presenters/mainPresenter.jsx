import MainView from "../views/mainView";
import React from "react";

function MainPresenter(props) {

  const [openMobileGroup, openWindow] = React.useState(props.model.openMGroup);

  React.useEffect(wasCreatedACB, []);

  function observerACB() {
    openWindow(props.model.openMGroup);
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
      <MainView model={props.model} openMobileGroup={openMobileGroup}/>
    </div>
  );
}
export default MainPresenter;
