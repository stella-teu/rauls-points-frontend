import NavBar from "./components/NavBar/Navbar.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Landing from "./components/Landing/Landing.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx";
// import Show from "./components/Show/Show.jsx";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.jsx"
import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing  />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;