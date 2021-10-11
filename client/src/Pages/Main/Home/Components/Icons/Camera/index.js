import * as React from "react";
import { Link } from "react-router-dom";

function Camera(props) {
  return (
    <Link to='/photography'>
      <svg viewBox="0 0 151.5 117.49">
        <defs>
          <style>
            {`.prefix__cls-1,.prefix__cls-2{fill:none;stroke:${props.color};stroke-linecap:round;stroke-linejoin:round;stroke-width:4px}.prefix__cls-2{fill:none}`}
          </style>
        </defs>
        <g id="prefix__Layer_2" data-name="Layer 2">
          <g id="prefix__Layer_1-2" data-name="Layer 1">
            <rect
              className="prefix__cls-1"
              x={1.5}
              y={19.08}
              width={148.5}
              height={96.92}
              rx={10.5}
            />
            <circle className="prefix__cls-2" cx={22.21} cy={39.79} r={8.99} />
            <path
              className="prefix__cls-2"
              d="M106.62 17.9H50.34L60.62 1.5h35.72l10.28 16.4zM3.06 62.85H150"
            />
            <circle className="prefix__cls-1" cx={78.49} cy={63.24} r={26.96} />
            <circle className="prefix__cls-1" cx={78.88} cy={62.85} r={14.85} />
          </g>
        </g>
      </svg>
    </Link>
  );
}

export default Camera;
