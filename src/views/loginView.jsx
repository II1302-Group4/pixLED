import React from "react";
import { auth } from "../firebaseModel";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";

function loginView(props) {
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
  return (
    <div>
      {props.isLoggedIn ? (
        <button className="txt-btn" onClick={signOutWithGoogle}>
          Sign out
        </button>
      ) : (
        <button className="txt-btn" onClick={signInWithGoogle}>
          Login
        </button>
      )}
    </div>
  );
}

export default loginView;
