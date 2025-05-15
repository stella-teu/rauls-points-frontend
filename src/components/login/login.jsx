import { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router"
import { signIn } from '../../services/authService'
import { UserContext } from "../../contexts/UserContext";
import './login.css';

function Login() {
   const navigate = useNavigate();
  const { setProfile } = useContext(UserContext);
  const [form, setForm] = useState({
      username: "",
      password: "",
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
      const profileData = await signIn(form);
      setProfile(profileData);

      navigate("/profile");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        password: "",
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
      return <button type="submit">Log In</button>;
    }
  };

  return (
      <div className="login-container">
      <div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type='text'
            name='username'
            value={form.username}
            placeholder='Enter Username'
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type='password'
            name='password'
            value={form.password}
            placeholder='Enter Password'
            onChange={handleChange}
            required
            autoComplete="off"
          />

          {renderError()}

          <Link to="/register">
            <p>No account? Sign up here!</p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login





