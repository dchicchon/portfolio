import React, { useEffect, useRef } from "react";
import "./style.css";

// https://overreacted.io/a-complete-guide-to-useeffect/
// How to use useEffect and functional hooks
const MessageLog = ({ messageLog, loading }) => {
  const messsagesEndRef = useRef(null);

  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const scrollToBottom = () => {
    messsagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageLog, loading]);

  return (
    <div className="log">
      <h2 id="title">Messages</h2>
      <div
        className="messages"
        style={{
          // height: "25rem",
          borderRadius: "25px",
          overflow: "auto",
          padding: "1rem",
          border: "1px white solid",
        }}
      >
        {loading && messageLog ? (
          <p>Loading...</p>
        ) : (
          messageLog.map((message, key) => (
            <div className="message" key={key}>
              <p>
                {message.author}: {message.message}
              </p>
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
          ))
        )}
        <div ref={messsagesEndRef}></div>
      </div>
    </div>
  );
  // }
};

export default MessageLog;
