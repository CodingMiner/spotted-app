import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import spotifyLogo from "../assets/spotify_large_logo.png";
import Authorization from "../features/authorization/Authorization";
import { selectIsLoggedIn } from "../features/authorization/authorizationSlice";
import { PATH_ROUTES } from "../routes/Routes";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH_ROUTES.MAIN_PAGE);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="Welcome-container">
      <header className="Welcome-header">
        <div>
          <h1 className="Welcome-text">Welcome!</h1>
          <p className="Welcome-description">
            The first thing you need to do is log in to your Spotify account
          </p>
          <img src={spotifyLogo} className="Welcome-logo" alt="logo" />
          <Authorization />
        </div>
      </header>
    </div>
  );
};

export default WelcomePage;
