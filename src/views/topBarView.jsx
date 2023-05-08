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
          <LoginPresenter model={props.model}/>
        </div>
        <div className="tutorial-btn">
          <button className={props.user ? "text-btn" : "hidden"} onClick={onTutorialStart}>Tutorial</button>
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