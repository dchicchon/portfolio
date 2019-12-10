import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

let linkStyle = {
    'color': 'white',
    'marginTop':'1rem'
}

const Footer = () => {
    return (
        <div id='footer'>
            <Link style={linkStyle} to='/'>Back Home</Link>
        </div>
    )
}

export default Footer