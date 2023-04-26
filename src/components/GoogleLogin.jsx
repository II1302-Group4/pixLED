import React from "react";
import { auth } from "../firebaseModel";
import { Button } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";

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
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
};

export const GoogleLogin = (props) => {
    return (
        <div>
            {props.isLoggedIn ? (
                <button className="submit-btn" onClick={signOutWithGoogle}>
                    Sign out
                </button>
            ) : (
                <button className="submit-btn"
                 onClick={signInWithGoogle}>Login with Google</button>
            )}
        </div>
    );
};
