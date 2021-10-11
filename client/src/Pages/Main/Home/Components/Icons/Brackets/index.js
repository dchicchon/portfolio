import * as React from "react";
import { Link } from "react-router-dom";

function Brackets(props) {
  return (
    <Link to="/code">
      <svg viewBox="0 0 204.95 126.47">
        <defs>
          <style>
            {`.brackets{fill:${props.color};stroke:${props.color};stroke-linecap:round;stroke-linejoin:round}`}
          </style>
        </defs>
        <g id="prefix__Layer_2" data-name="Layer 2">
          <g id="prefix__Layer_1-2" data-name="Layer 1">
            <rect
              className="brackets"
              x={27.75}
              y={-3.88}
              width={9.44}
              height={82.63}
              rx={1.41}
              transform="rotate(45 32.463 37.437)"
            />
            <rect
              className="brackets"
              x={101.22}
              y={-1.88}
              width={8.52}
              height={130.24}
              rx={2.93}
              transform="rotate(17.19 105.488 63.266)"
            />
            <rect
              className="brackets"
              x={28.01}
              y={48.55}
              width={8.92}
              height={82.63}
              rx={2.23}
              transform="rotate(135 32.47 89.86)"
            />
            <rect
              className="brackets"
              x={167.68}
              y={49.31}
              width={9.44}
              height={82.63}
              rx={1.21}
              transform="rotate(-135 172.403 90.623)"
            />
            <rect
              className="brackets"
              x={167.93}
              y={-3.12}
              width={8.92}
              height={82.63}
              rx={1.09}
              transform="rotate(-45 172.394 38.202)"
            />
          </g>
        </g>
      </svg>
    </Link>
  );
}

export default Brackets;
