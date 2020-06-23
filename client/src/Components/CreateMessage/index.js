import React from "react";

const CreateMessage = ({ sendMessage, message, setMessage }) => {
  return (
    <div id="create-message" style={{ width: "20rem" }}>
      <div>
        <h5>Send Message</h5>
        <input
          className="fun-input"
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "75%" }}
        />
        <button className="room-send-message" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CreateMessage;
