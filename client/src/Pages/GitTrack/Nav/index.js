import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "./style.css";

const Logo = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet" width={512} height={512} viewBox="0 0 500 500" className='gittrack-logo' >
      <path
        vectorEffect="non-scaling-stroke"
        d="M394.77 254.456c23.997 0 43.474 19.477 43.474 43.474 0 23.997-19.477 43.474-43.474 43.474-23.997 0-43.474-19.477-43.474-43.474 0-23.997 19.477-43.474 43.474-43.474zM110.4 396.833c24.695 0 44.737 20.042 44.737 44.737s-20.042 44.737-44.737 44.737-44.737-20.042-44.737-44.737 20.042-44.737 44.737-44.737zM99.82 162.476c23.01 0 41.684 18.674 41.684 41.684 0 23.01-18.674 41.684-41.684 41.684-23.01 0-41.684-18.674-41.684-41.684 0-23.01 18.674-41.684 41.684-41.684zM400.17 29.072c22.72 0 41.158 18.439 41.158 41.158 0 22.72-18.439 41.158-41.158 41.158-22.72 0-41.158-18.439-41.158-41.158 0-22.72 18.439-41.158 41.158-41.158z"
        stroke="#85ceff"
        strokeWidth={2}
        fill="#0e1525"
      />
      <path
        fill='#85ceff'
        vectorEffect="non-scaling-stroke"
        d="M248.217 356.214l106.813-45.279 7.8 18.4-216.2 91.65-7.8-18.4zM245.662 123.681L357.02 76.475l7.8 18.4-225.4 95.55-7.8-18.4zM251.234 240.403L355.26 278.03l-6.8 18.8-210.56-76.16 6.8-18.8z"
      />
    </svg>
  )
}

// consider adding hamburger menu
export const Nav = () => {
  const navRef = useRef(null)

  const toggleNav = (e) => {

    // if (navRef.current.style.left.length === 0) {
    // navRef.current.style.left = '-10rem'
    // }

    if (navRef.current.style.left === '0rem') {
      navRef.current.style.left = '-9rem'
    } else {
      navRef.current.style.left = '0rem'
    }
  }

  return (
    <div id="gittrack-nav">
      <div ref={navRef} id='gittrack-nav-mobile'>
        <ul className="mobile-nav-list">
          <li className="nav-link">
            {/* image here */}
            <div style={{ height: '50px', width: '50px', position: 'relative' }}>
              <Logo />
            </div>
          </li>
          <li className="nav-link">
            <Link to="/GitTrack">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/GitTrack/docs">Docs</Link>
          </li>
          <li className="nav-link">
            <Link to="/GitTrack/terms">Terms</Link>
          </li>
          <li className="nav-link">
            <Link to="/GitTrack/privacy">Privacy</Link>
          </li>
          <li className="nav-link">
            <Link to="/GitTrack/support">Support</Link>
          </li>
          <li className='nav-link'>
            <a target='_blank' rel='noopener noreferrer' href='https://github.com/dchicchon/gittrack-slack-app'>
              Github
            </a>
          </li>
          <li className="nav-link">
            <Link to="/code">Return to Code</Link>
          </li>
        </ul>
        <span onClick={toggleNav} className='gittrack-menu-icon'>{'>'}</span>
      </div>

      <ul id="nav-list">
        <li className="nav-link">
          {/* image here */}
          <div style={{ height: '50px', width: '50px', position: 'relative' }}>
            <Logo />
          </div>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack/docs">Docs</Link>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack/terms">Terms</Link>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack/privacy">Privacy</Link>
        </li>
        <li className="nav-link">
          <Link to="/GitTrack/support">Support</Link>
        </li>
        <li className='nav-link'>
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/dchicchon/gittrack-slack-app'>
            Github
          </a>
        </li>
        <li className="nav-link">
          <Link to="/code">Return to Code</Link>
        </li>
      </ul>
    </div>
  );
};
