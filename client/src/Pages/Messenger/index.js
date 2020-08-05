import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

// Utils
import { db } from "../../Utils/firebase";

const Messenger = () => {
  let history = useHistory();
  let [error, setError] = useState("");
  let [user, setUser] = useState("");

  let joinMessenger = () => {
    if (user.length > 3) {
      console.log(`User '${user}' is joining...`);
      setError("");
      db.ref("/messaging/users").push({ user });
      history.push("/code/board", [user]);
    } else {
      setError("Username must be longer than 3 characters");
    }
  };

  return (
    <div className="login-background">
      <div className="login">
        <h2 className="messenger-title">Messenger</h2>
        <div className="username-label" htmlFor="username">
          Username
        </div>
        <div className="input-group mb-3 username-input">
          <input
            type="text"
            className="w-100"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="username-label" style={{ color: "red" }}>
          {error}
        </div>
        <button onClick={joinMessenger} className="btn-primary login-button">
          Join{" "}
        </button>
      </div>
    </div>
  );
};

export default Messenger;
