import NavBar from "./components/NavBar/Navbar.jsx";
import Register from "./components/register/register.jsx";
import Login from "./components/login/login.jsx";
import Landing from "./components/Landing/landing.jsx";
import Leaderboard from "./components/leaderboard/leaderboard.jsx";
import Profile from "./components/profile/profile.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx";
// import Show from "./components/Show/Show.jsx";
// import { useContext } from "react";
// import { UserContext } from "./contexts/UserContext.jsx"
import { Routes, Route } from "react-router";
import "./App.css";

import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";

function App() {
  // const { profile } = useContext(UserContext);

  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;