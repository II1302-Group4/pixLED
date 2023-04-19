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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={signOutWithGoogle}
                >
                    Sign out from PixLED
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={signInWithGoogle}
                >
                    Sign in on PixLED
                </Button>
            )}
        </div>
    );
};
