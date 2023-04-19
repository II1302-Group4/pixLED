import "./App.css";
import { useState, useEffect } from "react";
import MainPresenter from "./presenters/mainPresenter";
import MatrixGrid from "./presenters/matrixGridPresenter";
import { GoogleLogin } from "./components/GoogleLogin";
import { auth } from "./firebaseModel";
import ColorPallete from './presenters/colorPalettePresenter';


function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <GoogleLogin isLoggedIn={isLoggedIn} />
            <MainPresenter />
            <MatrixGrid model={props.model} />
            <ColorPallete  model={props.model}/>
        </>
    );

}

export default App;
