import { Link } from "react-router-dom"; // make sure it's react-router-dom

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="header">PS2 Cheat Code Archive</h1>
      <Link className="enter-button" to="/GameLibrary">
        Enter
      </Link>
    </div>
  );
}
