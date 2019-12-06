import React from 'react';
import './style.css';

// This Page will have to make a call to the server to serve up the images that I send it from my unsplash account
class Photography extends React.Component {
    state = {

    }

    render() {
        return (
            <div id='photography'>
                <h1>Photography</h1>
                {/* Here is where I append all of my photos */}
                <section></section>
            </div>
        )
    }
}

export default Photography;