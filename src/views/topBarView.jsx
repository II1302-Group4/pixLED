import Logo from "../assets/logo2.png";
import LoginPresenter from "../presenters/loginPresenter";

function topBarView(props) {
  return (
      <div>
        <div className="logo">
          <img src={Logo}/>
        </div>
        <div className="login-btn">
          <LoginPresenter model={props.model}/>
        </div>
        <div className="tutorial-btn">
          <button className="txt-btn" onClick={console.log("tutorial")}>Tutorial</button>
        </div>
      </div>
  );
}

//Information about logedin user. Maybe put this under "profile" or something instead//
/*  <span>
        {!props.user ? (
          <span>No user logged in</span>
        ) : (
          <>
            <div>{props.user.name}</div>
            <div>User ID: {props.user.id.slice(0, 6)}</div>
          </>
        )}
      </span>*/

export default topBarView;