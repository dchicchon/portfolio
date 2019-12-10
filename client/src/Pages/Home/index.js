import React from 'react';
// import { Link } from 'react-router-dom';
import './style.css';

// Components
// import Navbar from '../../Components/Navbar';
// import Block from '../../Components/Block';
import Intro from '../../Components/Intro';
import About from '../../Components/About';
import HomeFeatured from '../../Components/HomeFeatured';
import Contact from '../../Components/Contact';



class Home extends React.Component {
    state = {
        // hidden: false
    }

    componentDidMount() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                })
            })
        })
    }


    render() {
        return (
            <div className='home-container y-proximity y-scroll'>
                {/* <Navbar /> */}
                <Intro />
                {/* <Block /> */}
                <About />
                {/* <Block /> */}
                <HomeFeatured />
                {/* <Block /> */}
                <Contact />
            </div>
        )
    }
}

export default Home;