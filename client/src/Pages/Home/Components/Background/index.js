import React, { useEffect } from "react";
import Dog from "../Icons/Dog";
import Camera from "../Icons/Camera";
import Brackets from "../Icons/Brackets";
import Video from "../Icons/Video";

// depending on the width passed in, we will show a certain number of icons

function Background({ color, setPage, width }) {
  return (
    <ul className="icon-list">
      {console.log(width)}
      {width > 480 ? (
        <>
          <div className="background-row">
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
          </div>
          <div className="background-row">
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
          </div>
          <div className="background-row">
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
          </div>
          <div className="background-row">
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
          </div>
          <div className="background-row">
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
          </div>
          <div className="background-row">
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Bark!");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Dog color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Photography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Camera color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Code");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Brackets color={color} />
            </li>
            <li
              className="background-icon"
              onMouseEnter={() => {
                setPage("Videography");
              }}
              onMouseLeave={() => {
                setPage("");
              }}
            >
              <Video color={color} />
            </li>
          </div>
        </>
      ) : (
        <>
          <div className="background-row">
            <li className="background-icon">
              <Video color={color} />
            </li>
            <li className="background-icon">
              <Dog color={color} />
            </li>
            <li className="background-icon">
              <Camera color={color} />
            </li>
            <li className="background-icon">
              <Brackets color={color} />
            </li>
          </div>
          <div className="background-row">
            <li className="background-icon">
              <Brackets color={color} />
            </li>
            <li className="background-icon">
              <Video color={color} />
            </li>
            <li className="background-icon">
              <Dog color={color} />
            </li>
            <li className="background-icon">
              <Camera color={color} />
            </li>
          </div>
          <div className="background-row">
            <li className="background-icon">
              <Camera color={color} />
            </li>
            <li className="background-icon">
              <Brackets color={color} />
            </li>
            <li className="background-icon">
              <Video color={color} />
            </li>
            <li className="background-icon">
              <Dog color={color} />
            </li>
          </div>
          <div className="background-row">
            <li className="background-icon">
              <Dog color={color} />
            </li>
            <li className="background-icon">
              <Camera color={color} />
            </li>
            <li className="background-icon">
              <Brackets color={color} />
            </li>
            <li className="background-icon">
              <Video color={color} />
            </li>
          </div>
          <div className="background-row">
            <li className="background-icon">
              <Video color={color} />
            </li>
            <li className="background-icon">
              <Dog color={color} />
            </li>
            <li className="background-icon">
              <Camera color={color} />
            </li>
            <li className="background-icon">
              <Brackets color={color} />
            </li>
          </div>
          <div className="background-row">
            <li className="background-icon">
              <Brackets color={color} />
            </li>
            <li className="background-icon">
              <Video color={color} />
            </li>
            <li className="background-icon">
              <Dog color={color} />
            </li>
            <li className="background-icon">
              <Camera color={color} />
            </li>
          </div>
        </>
      )}
    </ul>
  );
}

export default Background;
