import React, { useState, useEffect } from "react";
import "./style.css";

// Utils
import { messagingRef } from "../../Utils/firebase";
import { auth } from "../../Utils/firebase";

// Components
import MessageLog from "../../Components/MessageLog";
import CreateMessage from "../../Components/CreateMessage";
import Navbar from "../../Components/Navbar";
import Rooms from "../../Components/Rooms";
// import Footer from "../../Components/Footer";

const Messenger = () => {
  let [message, setMessage] = useState("");
  let [messageLog, setMessageLog] = useState([]);
  let [loading, setLoading] = useState(true);
  let [username, setUsername] = useState("");
  let [menu, setMenu] = useState(1);
  let [rooms] = useState([{ number: 1 }, { number: 2 }, { number: 3 }]);
  let [roomSelected, setRoomSelected] = useState(0);
  // let [usersRefKey, setUsersRefKey] = useState();
  // let [usersList, setUsersList] = useState([]);

  useEffect(() => {});

  useEffect(() => {
    // User has not joined a room
    if (roomSelected === 0) {
      setMessage("");
      setMessageLog([]);
    } else {
      let roomListRef = messagingRef.child("rooms");

      // Users by room
      // let usersRef = roomListRef.child(roomSelected).child("users");

      // Messages by room
      let messagesRef = roomListRef.child(roomSelected).child("messages");

      // Add current user to users collection
      // newUserRef = usersRef.push();
      // newUserRef.set({ name: user.displayName, id: user.uid });

      // Get all users in the room
      // usersRef.on("value", (snapshot) => {
      //   if (snapshot.val()) {
      //     users = Object.values(snapshot.val()); // arange into an array to map
      //     setUsersList(users);
      //     setUsersRefKey(newUserRef.key); // use this key to remove user from room
      //   }
      // });

      // get all the messages of the selected room
      messagesRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          // There are messages
          let messages = Object.values(snapshot.val());
          setMessageLog(messages);
          setLoading(false);
        } else {
          setMessageLog([]);
          setLoading(false);
        }
      });
    }

    // Make roomSelected a dependency (run this function again if roomSelected changes)
  }, [roomSelected]);

  let sendMessage = () => {
    // If message is longer than 0

    let timestamp = new Date().toLocaleString();

    if (message.length > 0) {
      let newMessage = {
        message,
        author: auth().currentUser.displayName,
        timestamp,
      };

      let roomListRef = messagingRef.child("rooms");
      let messagesRef = roomListRef.child(roomSelected).child("messages");

      // Add this message to the selected room's messageBoard
      messagesRef.push().set(newMessage);
    } else {
      //   console.log("you must add text!");
    }
    // console.log("Sending Message");
  };

  let logOut = () => {
    if (roomSelected !== 0) {
      leaveRoom();
    }
    auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let leaveRoom = () => {
    // console.log("Leaving room");
    // Make a reference to the room
    // let roomListRef = messagingRef.child("rooms").child(roomSelected);
    // let usersRef = roomListRef.child("users");

    // console.log("Key to remove:", usersRefKey);
    // usersRef.child(usersRefKey).remove();
    setRoomSelected(0);
    setMenu(1);

    // Reset the variables
  };

  let submitUsername = () => {
    auth().currentUser.updateProfile({
      displayName: username,
    });
  };

  let changeRoom = (number) => {
    setRoomSelected(number);
    setMenu(0);
  };

  // Settings
  if (menu === 2) {
    return (
      <div className="messenger">
        <h2 style={{ paddingTop: "3rem" }}>Messenger</h2>
        <div className="messenger-nav">
          {/* User: {user.displayName} */}
          <div className="messenger-options">
            <button className="messenger-options-button">
              {auth().currentUser.displayName
                ? auth().currentUser.displayName
                : "User"}
            </button>
            <div className="messenger-options-content">
              <button onClick={() => setMenu(1)}>Messenger</button>
              <button onClick={() => logOut()}>Logout</button>
            </div>
          </div>
        </div>
        <div style={{ width: "95%", margin: "0 auto" }}>
          <h2>Settings</h2>
          <div>
            UserName: {auth().currentUser.displayName}{" "}
            <input
              className="fun-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
            <button className="fun-button" onClick={() => submitUsername()}>
              Submit Username
            </button>
          </div>
        </div>
      </div>
    );
  } else if (menu === 1) {
    return (
      <div className="messenger">
        <Navbar />
        {/* If Room Selected show chat, if no room selected, show all rooms available */}
        <h2 style={{ paddingTop: "3rem" }}>Messenger</h2>
        <div className="messenger-nav">
          {/* User: {user.displayName} */}
          <div className="messenger-options">
            <button className="messenger-options-button">
              {auth().currentUser.displayName}
            </button>
            <div className="messenger-options-content">
              <button onClick={() => setMenu(2)}>Settings</button>
              <button onClick={() => logOut()}>Logout</button>
            </div>
          </div>
        </div>
        <Rooms roomList={rooms} changeRoom={changeRoom} />
      </div>
    );
  } else {
    return (
      <div className="messenger">
        <Navbar />
        {/* If Room Selected show chat, if no room selected, show all rooms available */}
        <h2 style={{ paddingTop: "3rem" }}>Messenger</h2>
        <div className="messenger-nav">
          {/* User: {user.displayName} */}
          <div className="messenger-options">
            <button className="messenger-options-button">
              {auth().currentUser.displayName}
            </button>
            <div className="messenger-options-content">
              <button onClick={() => setMenu(2)}>Settings</button>
              <button onClick={() => logOut()}>Logout</button>
            </div>
          </div>
        </div>
        <div className="room">
          <div>
            <h2>Room {roomSelected}</h2>
            <div style={{ width: "7rem", margin: "0 auto" }}>
              <button className="room-leave-btn" onClick={() => leaveRoom()}>
                Leave Room
              </button>
            </div>
            <CreateMessage
              sendMessage={sendMessage}
              message={message}
              setMessage={setMessage}
              roomSelected={roomSelected}
              setRoomSelected={setRoomSelected}
            />
          </div>
          <MessageLog loading={loading} messageLog={messageLog} />
        </div>
        )
      </div>
    );
  }
};

export default Messenger;
