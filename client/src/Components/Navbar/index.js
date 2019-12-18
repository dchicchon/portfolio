import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      scrollPos: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { scrollPos } = this.state;
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      show: document.body.getBoundingClientRect().top < scrollPos
    });
  };
  render() {
    const headerClassName = this.state.show ? "nav-show nav-hide" : "nav-show";
    return (
      <header className={headerClassName}>
        <nav className="nav-area">
          <div className="nav-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/code">Code</Link>
              </li>
              <li>
                <Link to="/photography">Photography</Link>
              </li>
              <li>
                <Link to="/videography">Videography</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
