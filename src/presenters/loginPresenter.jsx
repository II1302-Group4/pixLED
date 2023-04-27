import React from "react";
import LoginView from "../views/loginView";

function loginPresenter(props) {
    return (
        <div>
            {<LoginView isLoggedIn={props.isLoggedIn}/>}
        </div>
    );
};

export default loginPresenter;
