import React, { useState } from "react";
import { login } from "../../Utils/auth";
import { Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  let submitCredentials = (event) => {
    event.preventDefault();
    try {
      login(email, password); // login
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <form
        className="login-form"
        autoComplete="off"
        onSubmit={submitCredentials}
      >
        <h2>Login</h2>
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <label style={{ margin: "0.5rem auto" }}>
            {/* Email:{" "} */}
            <input
              className="login-input"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </label>
          <label style={{ margin: "0.5rem auto" }}>
            {/* Password:{""} */}
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </label>
        </div>
        <p style={{ color: "orange" }}>{error}</p>
        <div style={{ margin: "0 auto", width: "25%" }}>
          <button className="login-submit" type="submit">
            Submit
          </button>
        </div>
        <p style={{ textAlign: "center" }}>
          Don't have an account? Login{" "}
          <Link style={{ color: "lightblue" }} to="/code/signup">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
