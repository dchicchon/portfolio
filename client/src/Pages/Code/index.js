import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import Featured from '../../Components/Featured';
import Services from '../../Components/Services';
import CodeAbout from '../../Components/CodeAbout';
import Footer from '../../Components/Footer';
// import Projects from '../../Components/Projects';

import Navbar from '../../Components/Navbar';


class Code extends React.Component {
    state = {

    }

    fadeIn = () => {
        console.log("I exist")
        let techArr = document.getElementsByClassName('boxshadow')
        console.log(techArr)
        techArr.forEach(elm => {
            let bottom_of_object = elm.position().top + elm.outerHeight;
            let bottom_of_window = window.scrollTop() + window.innerHeight();
            console.log(bottom_of_object);
            console.log(bottom_of_window);
            if (bottom_of_window > bottom_of_object) {
                elm.animate({ 'opacity': '1' }, 500);
            }
        });
    }

    componentDidMount() {
        window.onscroll = () => {
            console.log("Scroll")
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Navbar />
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