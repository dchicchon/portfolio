import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import Featured from '../../Components/Featured';
import CodeAbout from '../../Components/CodeAbout';
import Projects from '../../Components/Projects';


class Code extends React.Component {
    state = {

    }

    render() {
        return (
            <div>
                <Featured />
                <CodeAbout />
                <Projects />
                <div>About</div>
                <div>Other Projects</div>
            </div>
        )
    }
}

export default Code;