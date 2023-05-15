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
        <b>PixLED is a local community-driven art installation that
        encourages people to work together.<br /> 
        <br/>
        The PixLED prototype platform is a modular pixelated grid of LED lights that allows its users to change the installation together at the same time. We were inspired by such cultural phenomenona as <a href="https://en.wikipedia.org/wiki/The_Million_Dollar_Homepage">The Million Dollar Homepage</a>, <a href="https://en.wikipedia.org/wiki/R/place">subreddit r/Place</a> and <a href="http://www.colourbynumbers.org/en/still.html">Colour by Numbers.</a>
        </b>
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
        Once you change a pixel, you will need to wait for some time before you could change anything else. This is timeout. It prevents spam and limits the possible chaos. Moreover, to make big, complicated drawings you will need to spend a lot of time waiting <u>or</u> find more people and collaborate with them. 
        <br/><br />
        By implementing a delay before allowing a new action,<br/>
        the timeout encourages users to work together and create art collectively, which is
        the primary objective of the product.</b>
      </p>
      -----------------------------------------------
      <h4>Why do we only have 16 colours?</h4>
      <p>
        <b>
          Our predecessors already proved that 16 colours is a good number both to give people enough variety, and simple to grasp. Furthermore, limitations often encourage people to be more creative and inventive. The groups might appreciate pre-determined colours as it is much easier to collaborate and use same shades in their common drawings. 
        </b>
      </p>
      -----------------------------------------------
      <h4>Why does your website looks so old?</h4>
      <p>
        <b>
          This is a design choice we made. The website's theme is inspired by old Microsoft Windows 95-98 versions and aesthetic of vaporwave culture. It is intentional. 
        </b>
      </p>
      -----------------------------------------------
      <h4>Who made this cute background image?</h4>
      <p>
        <b>
          Glad you asked! We got permission from <a href="https://www.instagram.com/grabrela_arts/?hl=en">@grabrela_arts</a> to use their beatiful artwork in our project. Check out their drawings! 
        </b>
      </p>
      -----------------------------------------------
      <h4>I have feedback/ideas. How can I give them to you?</h4>
      <p>
        <b>
          Thank you for that! You can use this <a href="https://forms.gle/wye816HQoa34kw4o8">Google Form</a>.
        </b>
      </p>
      -----------------------------------------------
      <h4>Can I add snapshots of the canvas to the <a href="https://pixled-17de5.web.app/history">History</a> page?</h4>
      <p>
        <b>
           If you have a team and you are its leader, you can click on the button to the bottom of the grid, saying "Upload Grid State" and the current state will be saved. But all other people can see the taken snapshot and download it. 
        </b>
      </p>
      -----------------------------------------------
      <h4>Why doesn't dark theme work properly?</h4>
      <p>
        <b>
           PixLED is a project with a lot of different colours involved, mostly light ones. Forced dark theme will be a problem to see the real picture and the beatiful vaporwave style, so please, remove your dark shades and enjoy the art with your bare eyes.
        </b>
      </p>
    </div>
    </div>
  );
}

export default AboutView;
