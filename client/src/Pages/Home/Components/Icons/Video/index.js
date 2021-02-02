import * as React from "react";
import { Link } from "react-router-dom";

function Video(props) {
  return (
    <Link to="/videography">
      <svg viewBox="0 0 160 125" {...props}>
        <defs>
          <style>
            {`.prefix__cls-1,.prefix__cls-2{fill:none}.prefix__cls-2{stroke:${props.color};stroke-miterlimit:10}`}
          </style>
        </defs>
        <g id="prefix__Layer_2" data-name="Layer 2">
          <rect
            className="prefix__cls-1"
            x={7.5}
            y={57.9}
            width={111}
            height={59.2}
            rx={3.82}
          />

          <path
            className="prefix__cls-1"
            d="M94.4 106.1a28.2 28.2 0 1128.2-28.2 28.23 28.23 0 01-28.2 28.2z"
            transform="translate(-65.7 -49.2)"
          />

          <path
            className="prefix__cls-1"
            d="M151.8 106.1A28.2 28.2 0 11180 77.9a28.23 28.23 0 01-28.2 28.2z"
            transform="translate(-65.7 -49.2)"
          />

          <path
            className="prefix__cls-2"
            d="M221.07 152l-39.39-8.15a.61.61 0 01-.48-.59v-20.1a.6.6 0 01.44-.58L221 111.71a.6.6 0 01.77.58v39.07a.6.6 0 01-.7.64z"
            transform="translate(-65.7 -49.2)"
          />
          <rect
            className="prefix__cls-2"
            x={18.9}
            y={70.7}
            width={46.2}
            height={33.6}
            rx={5.34}
          />
        </g>
      </svg>
    </Link>
  );
}

export default Video;
