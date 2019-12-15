import React from 'react';
// import { Link } from 'react-router-dom';
import './style.css';

// Components
import Featured from '../../Components/Featured';
import Services from '../../Components/Services';
import CodeAbout from '../../Components/CodeAbout';
import Footer from '../../Components/Footer';
// import Projects from '../../Components/Projects';

import Navbar from '../../Components/Navbar';


class Code extends React.Component {
    state = { hidden: false };

    componentDidMount() {
        // window.addEventListener('scroll', this.hideBar)
        this.navbarfunction()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hideBar)
    }

    hideBar = (e) => {
        console.log(e)
        console.log("I exist")
    }

    navbarfunction() {
        console.log("itworks")
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            console.log("scrolling")
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-50px";
            }
            prevScrollpos = currentScrollPos;
        }
    }

    render() {
        return (
            <div>
                {this.state.hidden ? <Navbar active='nav-hide' /> : <Navbar active='nav-show' />}
                <div id='code'>
                    <Featured />
                    <Services />
                    <CodeAbout />
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Code;