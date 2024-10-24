import React, { useState } from "react";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const response = await fetch("https://momentstay.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loggedIn = await response.json();

      if (response.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      } else {
        if (loggedIn.message.includes("email")) {
          setEmailError(loggedIn.message);
        } else if (loggedIn.message.includes("password")) {
          setPasswordError(loggedIn.message);
        } else {
          setEmailError("Login failed. Please check your credentials.");
        }
      }
    } catch (err) {
      console.log("Login failed", err.message);
      setEmailError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <h1>Login</h1>
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
          {emailError && (
            <p style={{ color: "red" }} className="error_message">
              {emailError}
            </p>
          )}
          {passwordError && (
            <p style={{ color: "red" }} className="error_message">
              {passwordError}
            </p>
          )}
        </form>
        <span>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "blue" }}>
            Register
          </a>{" "}
          here
        </span>
      </div>
    </div>
  );
};

export default Login;
