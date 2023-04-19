import React from "react";
import { GoogleLogin } from "../components/GoogleLogin";

const LoginPresenter = (props) => {
    return (
        <div>
            {!props.isLoggedIn && <GoogleLogin onLogin={props.onLogin} />}
        </div>
    );
};

export default LoginPresenter;
