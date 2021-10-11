import React, { useEffect, useState } from "react";
import Background from "./Components/Background";
import "./style.css";

function Home() {
  const [color, setColor] = useState("rgb(97, 218, 251)");
  const [width, setWidth] = useState("");
  const [page, setPage] = useState("");
  useEffect(() => {
    document.title = "Home";
    setWidth(window.screen.width);
  });
  return (
    <>
      <div className="home-intro-container">
        <div className="center-container">
          <h1 className="home-intro-header">
            <button
              style={{ color: color }}
              onClick={(e) => setColor("rgb(17,248,84)")}
              className="letter-btn"
            >
              D
            </button>
            <button
              style={{ color: color }}
              onClick={(e) => setColor("rgb(229 110 253)")}
              className="letter-btn"
            >
              a
            </button>
            <button
              style={{ color: color }}
              onClick={(e) => setColor("rgb(251 219 16)")}
              className="letter-btn"
            >
              n
            </button>
            <button
              style={{ color: color }}
              onClick={(e) => setColor("rgb(236 66 66)")}
              className="letter-btn"
            >
              n
            </button>
            <button
              style={{ color: color }}
              onClick={(e) => setColor("rgb(97,218,251)")}
              className="letter-btn"
            >
              y
            </button>
          </h1>
          {width > 480 ? (
            <h3 style={{ color: color }} className="home-intro-page">
              {page}
            </h3>
          ) : (
            ""
          )}
        </div>
        <Background setPage={setPage} color={color} width={width} />
      </div>
    </>
  );
}

export default Home;
