import React, { useState } from "react";
import { auth } from "../firebaseModel";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import googleLogo from "../assets/google-logo.png";
import { useNavigate } from "react-router-dom";

function LoginView(props) {
    const navigate = useNavigate();

    function navigateToProfile() {
        navigate("/profile");
    }
    function navigateToTeams() {
        navigate("/team");
    }
    function navigateToHistory() {
        navigate("/history");
    }
    function navigateToAboutUs() {
        navigate("/about");
    }

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
            props.signOut();
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
            {props.user ? (
                <>
                    <button className="txt-btn" onClick={handleOptionsClick}>
                        Options
                    </button>
                    {showOptions && (
                        <div className="dropdown-menu">
                            <ul>
                                <button
                                    className="txt-btn"
                                    onClick={navigateToProfile}
                                >
                                    {" "}
                                    Profile{" "}
                                </button>
                                <button
                                    className="txt-btn"
                                    onClick={navigateToTeams}
                                >
                                    {" "}
                                    Teams{" "}
                                </button>
                                <button
                                    className="txt-btn"
                                    onClick={navigateToHistory}
                                >
                                    {" "}
                                    History{" "}
                                </button>
                                <button
                                    className="txt-btn"
                                    onClick={navigateToAboutUs}
                                >
                                    {" "}
                                    About{" "}
                                </button>
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
