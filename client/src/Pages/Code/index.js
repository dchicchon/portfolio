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
    state = {
        hidden: true
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