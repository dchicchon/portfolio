import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../Utils/firebase";
import "./style.css";

const Board = (props) => {
  let history = useHistory();
  let [message, setMessage] = useState("");
  let [messageLog, setMessageLog] = useState([]);
  let [currentUser, setCurrentUser] = useState("");
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);

  let sendMessage = () => {
    if (message.length > 0) {
      console.log("Sending Message...");
      let currentTime = new Date();
      let dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };

      let timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };

      let timestamp = `${currentTime.toLocaleDateString(
        undefined,
        dateOptions
      )} ${currentTime.toLocaleTimeString("en-US", timeOptions)}`;

      let userMessage = {
        user: currentUser,
        text: message,
        timestamp,
      };
      setMessage("");
      db.ref("/messaging/messageLog").push(userMessage);
      //   Send message, user to firebase db
    } else {
      console.log("Must have text to send");
    }
  };

  let removeUser = () => {
    db.ref("messaging/users").on("value", function (snapshot) {
      if (snapshot.val()) {
        let usersList = Object.entries(snapshot.val());
        for (let i = 0; i < usersList.length; i++) {
          if (usersList[i][1].user === currentUser) {
            db.ref(`messaging/users/${usersList[i][0]}`).remove();
            history.push("/code/messenger");
            break;
          } else if (i === usersList.length - 1) {
            history.push("/code/messenger");
          }
        }
      }
    });
  };

  //   On tab close
  //   https://stackoverflow.com/questions/36355093/reactjs-browser-tab-close-event
  let unloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return removeUser();
    });
  };

  useEffect(() => {
    unloadListener();
    if (props.location.state) {
      setCurrentUser(props.location.state[0]);
    } else {
      console.log("Unknown user logged on");
      setCurrentUser("goober!");
    }

    // Retrieve users and messages for room
    db.ref("/messaging/messageLog").on("value", function (snapshot) {
      if (snapshot.val()) {
        let messages = Object.values(snapshot.val());
        // console.log(messages);
        setMessageLog(messages);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    db.ref("/messaging/users").on("value", function (snapshot) {
      if (snapshot.val()) {
        let boardUsers = Object.values(snapshot.val());
        // console.log(boardUsers);
        setUsers(boardUsers);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <div className="message-board">
        <div className="panel-one">
          <div className="board-heading">MessageBored</div>
          <div className="current-user">{currentUser}</div>
          <button className="board-btn" onClick={removeUser}>
            Leave
          </button>
          <div className="board-heading">Current Users</div>
          <div className="board-users">
            {loading
              ? "Loading Users..."
              : users.map((user, index) => (
                  <div key={index} className="user">
                    {user.user}
                  </div>
                ))}
          </div>
        </div>
        <div className="panel-two">
          <div className="board-heading">Messages</div>
          <div className="board-messages">
            {loading
              ? "Loading Messages..."
              : messageLog.map((message, index) => (
                  <div key={index} className="message">
                    <div className="message-user">{message.user}</div>
                    <div className="message-text">{message.text}</div>
                    <div className="message-timestamp">{message.timestamp}</div>
                  </div>
                ))}
          </div>
          <div className="create-message input-group mb-3 w-50">
            <input
              type="text"
              className="create-message-input"
              value={message}
              placeholder="Send Message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="button" className="board-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
