import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Link, useNavigate } from "react-router";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

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
          <button onClick={handleSignOut}>Sign Out</button>
      </li>
      <li>
        <Link to="/leaderboard">
          <button>Leaderboard </button>
        </Link>
      </li>
      <li>
        <Link to="/profile/:id">
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
          <button>Sign Out</button>
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
        <Link to="/profile/:id">
          <button>Profile </button>
        </Link>
      </li>
    </ul>
  );


  return (
  <nav>
    {  profile?.is_admin ? adminLinks : (profile ? authenticatedLinks : unAuthenticatedLinks)}
  </nav>
  );
}

export default NavBar;