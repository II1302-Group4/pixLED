import React from "react";
import LoginView from "../views/loginView";

function loginPresenter(props) {
  return (
    <span>
    {<LoginView model={props.model} isLoggedIn={props.isLoggedIn} />}</span>
  );
}

export default loginPresenter;
