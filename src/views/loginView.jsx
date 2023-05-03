import React, { useState } from "react";
import { auth } from "../firebaseModel";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import googleLogo from "../assets/google-logo.png";

function LoginView(props) {
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const signOutWithGoogle = async () => {
        try {
            await signOut(auth);
            props.model.setCurrentUser(null);
        } catch (error) {
            console.error("Error signing out with Google", error);
        }
    };

    const [showOptions, setShowOptions] = useState(false);

    //callback if "options" pressed, then display the options. the dropdownbar function
    const handleOptionsClick = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div>
            {props.isLoggedIn ? (
                <>
                    <button className="txt-btn" onClick={handleOptionsClick}>
                        Options
                    </button>
                    {showOptions && (
                        <div className="dropdown-menu">
                            <ul>
                                <button className="txt-btn"> Profile </button>
                                <button className="txt-btn"> Groups </button>
                                <button className="txt-btn">
                                    History
                                </button>
                                <button className="txt-btn">Artist</button>
                                <button
                                    className="txt-btn"
                                    onClick={signOutWithGoogle}
                                >
                                    Logout
                                </button>
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <button className="txt-btn" onClick={signInWithGoogle}>
                    <img src={googleLogo} id="google-logo" />
                    Login
                </button>
            )}
        </div>
    );
}

export default LoginView;
