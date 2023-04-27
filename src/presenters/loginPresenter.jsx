import React from "react";
import LoginView from "../views/loginView";

function loginPresenter(props) {
    return (
        <div>
            {!props.isLoggedIn && <LoginView onLogin={props.onLogin} />}
        </div>
    );
};

export default loginPresenter;
