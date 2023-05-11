import { useNavigate } from "react-router-dom";

function AboutView() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <button onClick={() => navigate("/")}>Back</button>
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">What is PixLED?</div>
      </div>
      <p>
        <b>PixLED provides a local community-driven art installation that
        encourages people to work together.<br /> 
        <br/>
        The PixLED prototype platform is a
        modular pixelated grid of LED lights that allows its users to change the
        installation together at the same time.</b>
      </p>
      </div>

      <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Rules</div>
      </div>
    <p>
      <ul>
        <li>No profanity</li>
        <li>No explicit drawings</li>
        <li>No advertising</li>
        <li>No cheating</li>
      </ul>
    </p>
      </div>

      <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">FAQ</div>
      </div>
      <h4>Why do we have a timeout?</h4>
      <p>
        <b>
        The timeout feature in our application is intended to prevent users from
        spamming the grid, thereby promoting collaboration among users. <br/>
        <br/>
        By implementing a delay before allowing a new action,<br/>
        the timeout encourages users to work together and create art collectively, which is
        the primary objective of the product.</b>
      </p>
      -----------------------------------------------
      <h4>Why do we only have 16 colours?</h4>
      <p>
        <b>
       </b>
      </p>
    </div>
    </div>
  );
}

export default AboutView;
