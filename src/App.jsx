import NavBar from "./components/NavBar/Navbar.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Landing from "./components/Landing/landing.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx";
// import Show from "./components/Show/Show.jsx";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.jsx"
import { Routes, Route } from "react-router";
import "./App.css";
<<<<<<< HEAD
import  Leaderboard  from "./components/Leaderboard/Leaderboard.jsx"
=======
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
>>>>>>> ed94d938ac65f3acef7ed7eacf7a95b8531d2945

function App() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing  />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/log-in" element={<Login />} />
<<<<<<< HEAD
        <Route path="/leaderboard" element={<Leaderboard/>}/>
=======
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel/>}/>
>>>>>>> ed94d938ac65f3acef7ed7eacf7a95b8531d2945
      </Routes>
    </>
  );
}

export default App;