function AboutView() {
  return (
    <div>
      <h1>About</h1>
      <h2>What is PixLED?</h2>
      <p>
        {" "}
        PixLED provides a local community-driven art installation that
        encourages people to work together. The PixLED prototype platform is a
        modular pixelated grid of LED lights that allows its users to change the
        installation together at the same time.
      </p>
      <h2>Rules</h2>
      <ul>
        <li>No profanity</li>
        <li>No explicit drawings</li>
        <li>No advertising</li>
        <li>No cheating</li>
      </ul>
      <h2>Why do we have a timeout?</h2>
      <p>
        The timeout feature in our application is intended to prevent users from
        spamming the grid, thereby promoting collaboration among users. By
        implementing a delay before allowing a new action, the timeout
        encourages users to work together and create art collectively, which is
        the primary objective of the product.
      </p>
    </div>
  );
}

export default AboutView;
