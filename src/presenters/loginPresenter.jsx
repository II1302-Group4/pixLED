import React from "react";
import LoginView from "../views/loginView";
import CodeOfConduct from "../views/codeOfConduct";

function loginPresenter(props) {
    const [user, setCurrentUser] = React.useState(props.model.currentUser);
    const [acceptedCodeOfConduct, setAcceptedCodeOfConduct] =
        React.useState(false);

    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setCurrentUser(props.model.currentUser);
    }

    function handleAcceptCodeOfConduct() {
        setAcceptedCodeOfConduct(true);
    }

    function wasCreatedACB() {
        props.model.addObserver(observerACB);
        function isTakenDownACB() {
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }

    function signOut() {
        props.model.setMembers([]);
        props.model.selectLED(null);
        props.model.setCurrentUser(null);
        window.location.reload();
    }

    return (
        <span>
            {!acceptedCodeOfConduct && (
                <div className="code-of-conduct-container">
                    <CodeOfConduct onAccept={handleAcceptCodeOfConduct} />
                </div>
            )}
            {acceptedCodeOfConduct && (
                <LoginView user={user} signOut={signOut} />
            )}
        </span>
    );
}

export default loginPresenter;
