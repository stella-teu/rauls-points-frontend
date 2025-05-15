import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Link, useNavigate } from "react-router";

function NavBar() {
  const { profile, setProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setProfile(null);
    navigate("/");
  };

  const authenticatedLinks = (
    <ul>
      <li>
        <Link to="/">
          <button>Home</button>
        </Link>
      </li>
      <li>
        <button onClick={handleSignOut}>Sign Out</button>
      </li>
      <li>
        <Link to="/leaderboard">
          <button>Leaderboard </button>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <button>Profile </button>
        </Link>
      </li>
    </ul>
  );

  const unAuthenticatedLinks = (
    <ul>
      <li>
        <Link to="/">
          <button>Home</button>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <button>Register </button>
        </Link>
      </li>
      <li>
        <Link to="/log-in">
          <button>Log In </button>
        </Link>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to="/">
          <button>Home</button>
        </Link>
      </li>
      <li>
        <button onClick={handleSignOut}>Sign Out</button>
      </li>
      <li>
        <Link to="/admin">
          <button>Admin</button>
        </Link>
      </li>
      <li>
        <Link to="/leaderboard">
          <button>Leaderboard </button>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <button>Profile </button>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav>
      {profile?.is_admin
        ? adminLinks
        : profile
        ? authenticatedLinks
        : unAuthenticatedLinks}
    </nav>
  );
}

export default NavBar;
