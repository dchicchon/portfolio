import React, { useState, useEffect } from "react";
import "./style.css";
const colors = ["gold", "violet", "springgreen", "tomato", "lightskyblue"];

const Cell = (props) => {
  let [checked, setChecked] = useState(false);
  let [type, setType] = useState("");
  let [flag, setFlag] = useState(false);
  let [hiddenStyle, setHiddenStyle] = useState({});
  let [checkedStyle, setCheckedStyle] = useState({});

  // When the game num changes, go ahead and rerender this cell

  useEffect(() => {
    // based on props.gameNum, we do things diff
    // let index = props.gameNum % 5; // if i want to change the color
    let index = 0;
    let hStyle = {
      border: `1px solid ${colors[index]}`,
      color: colors[index],
    };
    let cStyle = {
      border: `1px solid ${colors[index]}`,
      color: colors[index],
      background: props.type === "x" ? "red" : "rgba(255, 217, 0, 0.171)",
    };
    setType(props.type);
    setChecked(false);
    setFlag(false);
    setHiddenStyle(hStyle);
    setCheckedStyle(cStyle);
  }, [props.gameNum]);

  let cellClick = () => {
    if (checked) return;
    else if (type === "x") props.endGame(false);
    // if cell is 'x', game is over!
    else {
      // x is column, y is row
      let { x, y } = props;
      let mineNum = 0;
      // 0   1   2
      // o | o | o  0
      // x | o | x  1
      // o | x | o  2
      // Current Coord: (1,1)
      // use our cells current coordinate and add it to
      // our for loops to check the surrounding cells

      for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
          if (row === 0 && col === 0) continue; // dont check current cell
          if (y + row < 0 || y + row >= props.board.length) continue; // dont check y out of bounds
          if (x + col < 0 || x + col >= props.board[0].length) continue; // dont check x out of bounds
          let thisCell = props.board[y + row][x + col]; // get the value at this coordinate
          if (thisCell === "x") mineNum++; // if this cell has a mine, add to num
        }
      }

      // This works as long as were in the center somewhat
      // Dependent on y! Make this better later forsure bb

      // only do this if number of mines is 0
      if (mineNum === 0) {
        // we only click since all other cells not be mines
        // dont have to do the above code anymore
        // Should we split up cells based on our board array?
        // Check surrounding cells

        // what is x and y?
        for (let row = -1; row <= 1; row++) {
          for (let col = -1; col <= 1; col++) {
            if (row === 0 && col === 0) continue; // dont check the current cell dummy
            if (y + row < 0 || y + row >= props.board.length) continue;
            if (x + col < 0 || x + col >= props.board[0].length) continue;
            // let index = parseInt(`${y + row}${x + col}`);
            // if (index < 0 || index >= cells.length) continue;
            let cellY = y + row;
            let cellX = x + col;
            let surroundingCell = document.getElementById(`${cellY}-${cellX}`); // we have the cell, now get reference from board
            // Later on, implement a function that makes this a timed event
            let time = Math.floor(Math.random() * 150) + 100;
            setTimeout(() => surroundingCell.click(), time);
          }
        }
      }

      let copyBoard = props.board.slice(); // get our current board
      copyBoard[y][x] = mineNum;
      props.setBoard(copyBoard);

      // You win!
      if (props.checkWin(copyBoard)) {
        props.endGame(true);
      }

      if (mineNum === 0) {
        setType("");
      } else {
        setType(mineNum);
      }
    }
    setChecked(true); // this will re-render the cell
  };

  let putFlagDown = (event) => {
    event.preventDefault();
    if (!checked) setFlag(!flag);
  };
  // y is row
  // x is col
  return (
    <>
      {flag ? (
        <div
          id={`${props.y}-${props.x}`}
          className="cell"
          style={hiddenStyle}
          onContextMenu={(e) => putFlagDown(e)}
        >
          ?
        </div>
      ) : (
        <div
          id={`${props.y}-${props.x}`}
          className="cell"
          onClick={cellClick}
          onContextMenu={(e) => putFlagDown(e)}
          style={checked ? checkedStyle : hiddenStyle}
        >
          {checked ? type : " "}
        </div>
      )}
    </>
  );
};

export default Cell;
