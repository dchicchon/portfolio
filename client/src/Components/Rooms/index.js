import React from "react";

import "./style.css";

// import { messagingRef } from "../../Utils/firebase";

// let getUsers = () => {};

const Rooms = ({ roomList, changeRoom }) => {
  return (
    <div className="room-page">
      <h2>Rooms</h2>
      <div
        className="roomList"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        {roomList.map((room, key) => (
          <div
            key={key}
            className="room-item"
            onClick={() => changeRoom(room.number)}
          >
            <p style={{ transform: "translateY(50%)" }}>Room {room.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
