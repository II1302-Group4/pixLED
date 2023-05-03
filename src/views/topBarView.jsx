import Logo from "../assets/logo.png";
import LoginPresenter from "../presenters/loginPresenter";

function topBarView(props) {
  return (
    <div>
      <span>
        {!props.user ? (
          <span>No user logged in</span>
        ) : (
          <>
            <div>{props.user.name}</div>
            <div>User ID: {props.user.id.slice(0, 6)}</div>
          </>
        )}
      </span>

      <div className="logo">
        <img src={Logo} width="100vh" height="100vh" />
      </div>

      <LoginPresenter model={props.model} />
    </div>
  );
}

export default topBarView;
