import React from "react";
import LoginView from "../views/loginView";

function loginPresenter(props) {
    return (
        <div>
            {<LoginView onLogin={props.onLogin} isLoggedIn={props.isLoggedIn}/>}
        </div>
    );
};

export default loginPresenter;
