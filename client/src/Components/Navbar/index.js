import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends React.Component {
    state = {
        hidden: true
    }

    hideBar = () => {

        const { hidden } = this.state
        // This is hardcoded for now. Will not work with everything. Must find a more permanent solution
        if (window.scrollY > 560) { // if it is greater than the intro
            // this.setState({ hidden: false })
            window.scrollY > this.prev ?
                !hidden && this.setState({ hidden: true })
                :
                hidden && this.setState({ hidden: false });
            this.prev = window.scrollY
        } else {
            this.setState({ hidden: true })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.hideBar)
    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.hideBar)
    }

    render() {
        const classHide = this.state.hidden ? 'nav-hide' : 'nav-show'
        return (
            <header className={classHide}>
                <nav className='nav-area'>
                    <div className='nav-title'>Home</div>
                    <div className='spacer'></div>
                    <div className='nav-links'>
                        <ul>
                            <li><Link to='/code'>Code</Link></li>
                            <li><Link to='/music'>Music</Link></li>
                            <li><Link to='/photography'>Photos</Link></li>
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