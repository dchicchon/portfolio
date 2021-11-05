import React, { useState, useEffect } from "react";
import "./dashboard.css";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds >= 60 ? seconds - mins * 60 : seconds;
  const time = `${mins < 10 ? "0" + mins : mins}:${
    secs < 10 ? "0" + secs : secs
  }`;
  return time;
};

const Dashboard = (props) => {
  // Change anytime gameNum changes
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer = "";
    if (props.gameStatus === 0) {
      setSeconds(0);
      timer = setInterval(() => {
        setSeconds((prevState) => prevState + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [props.gameStatus]);

  return (
    <div id="dashboard">
      <p>Time: {formatTime(seconds)}</p>
      <p>Games Won: {props.gamesWon}</p>
      <p>Games Lost: {props.gamesLost} </p>
      {/* <p>Tiles Left: 25</p> */}
      {/* <p>Bombs: 20</p> */}
    </div>
  );
};

export default Dashboard;
