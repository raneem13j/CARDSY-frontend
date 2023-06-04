import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Login() {
  const [isLoginFormShown, setIsLoginFormShown] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignupClick = () => {
    setIsLoginFormShown(false);
  };

  const handleLoginClick = () => {
    setIsLoginFormShown(true);
  };



  //register function

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://cardsy.onrender.com/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);
      sessionStorage.setItem("role", data.role);

      // Decode the JWT token
      const decodedToken = jwt_decode(data.token);
      // console.log(decodedToken);

      alert("You have registered successfully");


      // if (data.role === "user") {
      //   navigate("/Home");
      // }

      window.location.href = "/Home";
     
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
       // Show error alert
       alert("Registration failed");
    }
  };

  //   login function

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("https://cardsy.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);
      sessionStorage.setItem("role", data.role);
      
       // Decode the JWT token
      const decodedToken = jwt_decode(data.token);
      // console.log(decodedToken);
      alert("You have loged in successfully");
      window.location.href = "/Home";
      // alert("You have loged in successfully");
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
       // Show error alert
      alert("Log in failed");
    }
  };

  return (
    <div className="login-all">
      <div className="login-body">
        <div className="login-container">
          <div
            className={`login-slider ${
              isLoginFormShown ? "" : "movelogin-slider"
            }`}
          ></div>
          <div className="login-btn">
            <button
              className={`login-login ${isLoginFormShown ? "active" : ""}`}
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className={`login-signup ${isLoginFormShown ? "" : "active"}`}
              onClick={handleSignupClick}
            >
              Sign up
            </button>
          </div>

          <div
            className={`login-form-section ${
              isLoginFormShown ? "" : "login-form-section-move"
            }`}
          >
            <form onSubmit={handleLogin} className="login-login-box">
              <input
                autoComplete="off"
                type="email"
                className="login-email ele"
                placeholder="youremail@email.com"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                autoComplete="off"
                type="password"
                className="login-password ele"
                placeholder="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
               {error && (
                      <p className="error-message"> Invalid Credentials</p>
                    )}
              <button className="login-clkbtn">Login</button>
            </form>

            <form onSubmit={handleRegister} className="login-signup-box">
              <input
                autoComplete="off"
                type="text"
                className="login-name ele"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                autoComplete="off"
                type="email"
                className="login-email ele"
                placeholder="youremail@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                autoComplete="off"
                type="password"
                className="login-password ele"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-message"> {error}</p>}
              <button className="login-clkbtn">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
