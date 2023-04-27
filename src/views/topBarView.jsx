import Logo from "../assets/logo.png";
import LoginPresenter from "../presenters/loginPresenter";

function topBarView(props) {
  return (
    <div>
      <span>
        {!props.model.currentUser ? (
          <span>No user logged in</span>
        ) : (
          <>
            <div>{props.model.currentUser.name}</div>
            <div>User ID: {props.model.currentUser.id.slice(0, 6)}</div>
          </>
        )}
      </span>

      <div className="logo">
        <img src={Logo} width="100vh" height="100vh" />
      </div>

      <LoginPresenter model={props.model} isLoggedIn={props.isLoggedIn} />
    </div>
  );
}

export default topBarView;
