import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import Intro from '../../Components/Intro';
import About from '../../Components/About';
import Contact from '../../Components/Contact';

class Home extends React.Component {
    state = {

    }

    render() {
        return (
            <div>
                <Intro />
                <About />
                <Contact />
            </div>
        )
    }
}

export default Home;