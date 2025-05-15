import { signUp } from "../../services/authService";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import './register.css';

function Register() {
  const navigate = useNavigate();
  const { setProfile } = useContext(UserContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confPassword: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const profileData = await signUp(form);
      setProfile(profileData);

      navigate("/profile");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        password: "",
        confPassword: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Register</button>;
    }
  };

  return (
    <>
      <div className="home-container">
        <div>
          <form className="home-form" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter Username"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="confPassword"
              name="confPassword"
              value={form.confPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {renderError()}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
