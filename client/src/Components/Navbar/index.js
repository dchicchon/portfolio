import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends React.Component {
    // state = {
    // prevScrollpos: window.pageYOffset,
    //     hidden: true
    // }

    // componentDidMount() {
        // window.addEventListener('scroll', this.hideBar)
    // }

    // componentWillUnmount() {
        // window.removeEventListener('scroll', this.hideBar)
    // }

    // hideBar(e) {
    // let lastScrollTop = 0;
    // const currentScrollTop = navbar.scrollTop;

    // Set the state of hidden depending on scroll position
    // We only change the state if it needs to be changed
    // if (!this.state.hidden && currentScrollTop > lastScrollTop) {
    // this.setState({ hidden: true });
    // } else if (this.state.hidden) {
    // this.setState({ hidden: false });
    // }
    // lastScrollTop = currentScrollTop;

    // const { hidden } = this.state;
    // console.low(window.scrollY);

    // // This is hardcoded for now. Will not work with everything. Must find a more permanent solution
    // if (window.scrollY > 100) { // if it is greater than the intro
    //     this.setState({ hidden: false })
    //     window.scrollY > this.prev ?
    //         !hidden && this.setState({ hidden: true })
    //         :
    //         hidden && this.setState({ hidden: false });
    //     this.prev = window.scrollY
    // } else {
    //     this.setState({ hidden: true })
    // }
    // }


    render() {
        // const classHide = this.state.hidden ? 'nav-hide' : 'nav-show'
        return (
            <header className={this.props.active}>
                <nav className='nav-area'>
                    {/* <div className='nav-title'>Home</div> */}
                    {/* <div className='spacer'></div> */}
                    <div className='nav-links'>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/code'>Code</Link></li>
                            <li><Link to='/photography'>Photography</Link></li>
                            <li><Link to='/music'>Videography</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
        )

    }
}
// const Navbar = (props) => {
// let navStyle;
// console.log(window.pageYOffset)
// if (window.pageYOffset < 500) {
//     navStyle = 'nav--hidden'
// } else {
//     navStyle = 'nav'
// }


export default Navbar;