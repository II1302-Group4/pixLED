import React from "react";
import LoginView from "../views/loginView";

function loginPresenter(props) {
  return (
    <div>{<LoginView model={props.model} isLoggedIn={props.isLoggedIn} />}</div>
  );
}

export default loginPresenter;
