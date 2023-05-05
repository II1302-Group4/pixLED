import Logo from "../assets/logo2.png";
import LoginPresenter from "../presenters/loginPresenter";
import introJs from 'intro.js';

function topBarView(props) {

  function onTutorialStart() {
    introJs().setOption("hidePrev", true).setOption("nextLabel", " > ").setOption("showBullets", false).setOption("prevLabel", " < ").setOptions({
      tooltipClass: 'tutorial-card'
    }).start();

  }
  return (
      <div>
        <div className="logo">
          <img src={Logo}/>
        </div>
        <div className="login-btn">
          <LoginPresenter model={props.model} isLoggedIn={props.isLoggedIn} />
        </div>
        <div className="tutorial-btn">
          <button className="txt-btn" onClick={onTutorialStart}>Tutorial</button>
        </div>
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
