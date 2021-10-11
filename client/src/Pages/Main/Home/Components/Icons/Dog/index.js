import React from "react";
import { Link } from "react-router-dom";

function Dog(props) {
  return (
    <Link to="#">
      <svg viewBox="0 0 157.64 180.73">
        <defs>
          <style>
            {`.prefix__cls-1,.prefix__cls-3{fill:none;stroke:${props.color};stroke-linecap:round;stroke-linejoin:round}.prefix__cls-1{stroke-width:3px}.prefix__cls-3{stroke-width:2px}`}
          </style>
        </defs>
        <g id="prefix__Layer_2" data-name="Layer 2">
          <g id="prefix__Layer_1-2" data-name="Layer 1">
            <circle className="prefix__cls-1" cx={34.46} cy={77.47} r={7.76} />
            <circle className="prefix__cls-1" cx={121.88} cy={75.46} r={7.77} />
            <path
              className="prefix__cls-1"
              d="M97.56 131.07c0 8.37-19.26 7.28-19.26 7.28v-23.19C85.84 111 89.19 106 92.54 99.25c3.09-6.17-5-8.37-12-9.11a21.63 21.63 0 00-4.55 0c-6.94.74-15.31 2.42-12 9.11 3 6 7.54 12.56 14.23 15.91v23.19s-19.25 1.09-19.25-7.28"
            />
            <path
              d="M78.3 178.73c57.57-2.2 74.32-32.34 74.32-32.34C161 128 149.27 42.57 149.27 42.57 142.57-7.67 127.5 5.73 127.5 5.73s-10 6.7-11.72 33.49c0 0-8.37-6.7-36.64-6.95-37.68 4-38.71 6.95-38.71 6.95C38.75 12.43 28.91 3.81 28.91 3.81S15.31-11 6.94 44.24c0 0-10 83.73-1.48 100.23 0 0 14.87 27 72.84 34.26"
              strokeWidth={4}
              fill="none"
              stroke={`${props.color}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="prefix__cls-3"
              d="M64.44 136.82c-13.77 26.07 1.31 22.72 1.31 22.72s8.64 1.12 7.67-21.21M68.77 137.87l-2.7 11.92"
            />
            <path
              fill={`${props.color}`}
              d="M62.41 119.64a1.5 1.5 0 000-3 1.5 1.5 0 000 3zM59.64 124.06a1.5 1.5 0 000-3 1.5 1.5 0 000 3zM56.29 120.71a1.5 1.5 0 000-3 1.5 1.5 0 000 3zM92.84 120.18a1.5 1.5 0 000-3 1.5 1.5 0 000 3zM90.07 124.59a1.5 1.5 0 000-3 1.5 1.5 0 000 3zM86.72 121.24a1.5 1.5 0 000-3 1.5 1.5 0 000 3z"
            />
          </g>
        </g>
      </svg>
    </Link>
  );
}

export default Dog;
