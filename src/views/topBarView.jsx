import Logo from "../assets/logo2.png";
import LoginPresenter from "../presenters/loginPresenter";

function topBarView(props) {
  return (
      <div>
        <span className="logo">
          <img src={Logo}/>
        </span>
        <span className="login-btn">
          <LoginPresenter model={props.model} isLoggedIn={props.isLoggedIn} />
        </span>
        <span className="tutorial-btn">
          <button className="txt-btn" onClick={console.log("tutorial")}>Tutorial</button>
        </span>
      </div>
  );
}

//Information about logedin user. Maybe put this under "profile" or something instead//
/*  <span>
        {!props.model.currentUser ? (
          <span>No user logged in</span>
        ) : (
          <>
            <div>{props.model.currentUser.name}</div>
            <div>User ID: {props.model.currentUser.id.slice(0, 6)}</div>
          </>
        )}
      </span>*/

export default topBarView;
