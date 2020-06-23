import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../Utils/auth";

// Stylesheet
import "./style.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();

  let submitCredentials = (event) => {
    event.preventDefault();
    if (username.length < 3) {
      console.log("Username must be at least 3 characters");
      setError("Username must be at least 3 characters");
    } else if (password.length < 6) {
      console.log("Password must be at least 6 characters");
      setError("Password must be at least 6 characters");
    } else if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      setError("Passwords do not match!");
    } else {
      console.log("Signing Up...");
      try {
        signup(email, password).then((result) => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          result.user
            .updateProfile({
              displayName: username,
            })
            .then((result) => {
              setUsername("");
            });
        });
      } catch (error) {
        console.log(error.message);
      }

      //   Use firebase auth
      //   auth.
    }
  };

  return (
    <div className="signup">
      <form
        className="signup-form"
        autoComplete="off"
        onSubmit={submitCredentials}
      >
        <h2>Signup</h2>
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
            <input
              className="fun-input"
              placeholder="Email"
              autoComplete="none"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </label>
          <label style={{ margin: "0.5rem auto" }}>
            <input
              className="fun-input"
              placeholder="Username"
              autoComplete="none"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></input>
          </label>
          <label style={{ margin: "0.5rem auto" }}>
            <input
              autoComplete="none"
              className="signup-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </label>
          <label style={{ margin: "0.5rem auto" }}>
            <input
              autoComplete="none"
              className="signup-input"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            ></input>
          </label>
        </div>
        <div style={{ margin: "0 auto", width: "25%" }}>
          <button className="signup-submit" type="submit">
            Submit
          </button>
        </div>
        <p style={{ textAlign: "center" }}>
          Already have an account? Sign in{" "}
          <Link style={{ color: "lightblue" }} to="/code/login">
            here
          </Link>
        </p>
        <p style={{ color: "orange" }}>{error}</p>
      </form>
    </div>
  );
};

export default Signup;
