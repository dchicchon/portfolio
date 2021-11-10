import React, { useRef } from 'react';
import { SketchPicker } from 'react-color'
import { Link } from 'react-router-dom'
import './style.css'

const Nav = (props) => {
    const nav = useRef(null)
    const toggleNavRef = useRef(null)
    const docs = useRef(null)
    const options = useRef(null)
    const landColorRef = useRef(null)
    const lineColorRef = useRef(null)
    const lineWidthRef = useRef(null)

    const toggleNav = (e) => {
        if (toggleNavRef.current.textContent === '<') {
            // anytime we hide the nav, be sure to hide everything

            nav.current.style.left = window.innerWidth < 600 ? '-10rem' : '-15rem'
            lineColorRef.current.style.display = 'none'
            toggleNavRef.current.textContent = '>'
        } else {
            nav.current.style.left = '0px'
            toggleNavRef.current.textContent = '<'
            // hide everything

        }
    }

    const toggleDocs = (e) => {
        if (docs.current.style.maxHeight === '0px' || !docs.current.style.maxHeight) {
            docs.current.style.maxHeight = '500px'
        } else {
            docs.current.style.maxHeight = '0px'
        }
    }
    const toggleOptions = (e) => {
        if (options.current.style.maxHeight === '0px' || !options.current.style.maxHeight) {
            options.current.style.maxHeight = '500px'
        } else {
            options.current.style.maxHeight = '0px'
        }
    }
    const toggleLineColor = (e) => {
        if (lineColorRef.current.style.display === 'none' || !lineColorRef.current.style.display) {
            lineColorRef.current.style.display = 'block'
        } else {
            lineColorRef.current.style.display = 'none'
        }
    }
    const toggleLineWidth = (e) => {
        if (lineWidthRef.current.style.display === 'none' || !lineWidthRef.current.style.display) {
            lineWidthRef.current.style.display = 'block'
        } else {
            lineWidthRef.current.style.display = 'none'

        }
    }
    const toggleLandColor = (e) => {
        if (landColorRef.current.style.display === 'none' || !landColorRef.current.style.display) {
            landColorRef.current.style.display = 'block'
        } else {
            landColorRef.current.style.display = 'none'
        }
    }
    const togglePlaces = (e) => {
        props.setPlaces(prevState => !prevState)
    }
    const toggleContours = (e) => {
        props.setContours(prevState => !prevState)
    }
    const handleColorChange = (color, property) => {
        switch (property) {
            case 'line-color':
                props.setLineColor(color.hex)
                break;
            case 'land-color':
                props.setLandColor(color.hex)
                break;
        }
    }

    const takePhoto = (e) => {
        // access map and get the dataurl
        let img = props.map.getCanvas().toDataURL();
        console.log(img);
        var download = document.createElement('a')
        download.href = img
        download.target = '_blank'
        download.download = 'map.png'
        let evt = document.createEvent('MouseEvents')
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        download.dispatchEvent(evt);

    }

    // Add functions for when we change any parameters
    return (
        <div ref={nav} id='topo-nav'>
            <div id='nav-panel'>
                <h2 id='title'>TOPO</h2>
                <ul id='topo-list'>
                    <li onClick={toggleDocs}>Documentation</li>
                    <li ref={docs} id='docs-container'>
                        <p>Welcome to Topo! This is a map where you can create photos of
                            contours on maps and edit the contour line colors and land color.
                            Try editing this map using the options button below!</p>
                    </li>
                    <li onClick={toggleOptions}>Options</li>
                    <li ref={options} id='option-container'>
                        <ul id='option-list'>
                            <li onClick={toggleLandColor}>Land Color</li>
                            <li onClick={toggleLineColor}>Contour Line Color</li>
                            <li onClick={toggleLineWidth}>Contour Line Width</li>
                            <li onClick={toggleContours}>Toggle Contours</li>
                            <li onClick={togglePlaces}>Toggle Places</li>
                            {/* <li onClick={toggleNaturalPlaces}>Toggle Natural Places</li> */}
                        </ul>
                    </li>
                    <li onClick={takePhoto}>Download Map</li>
                    <li>
                        <Link style={{ color: '#85ceff' }} to='/code'>
                            Back to Home
                        </Link>
                    </li>

                </ul>
                <div id='topo-footer'>
                    <p>Created By: {' '}</p>
                    <a style={{ color: '#85ceff' }} href='https://github.com/dchicchon'>Daniel Chicchon</a>
                </div>
            </div>
            <div id='nav-widgets'>
                <span ref={toggleNavRef} onClick={toggleNav} id='toggle-nav' className='tab-click'>{'<'}</span>
                <div ref={lineColorRef} className='option-widget'>
                    <h4>Line Color</h4>
                    <SketchPicker color={props.lineColor} onChangeComplete={(color) => handleColorChange(color, 'line-color')} />
                </div>
                <div ref={landColorRef} className='option-widget'>
                    <h4>Land Color</h4>
                    <SketchPicker color={props.landColor} onChangeComplete={(color) => handleColorChange(color, 'land-color')} />
                </div>
                <div ref={lineWidthRef} className='option-widget'>
                    <h4>Line Width</h4>
                    <input onChange={e => props.setLineWidth(parseFloat(e.target.value))} value={props.lineWidth} type='range' min='0.5' max='1.5' step='0.1' />
                </div>
            </div>
        </div>
    )
}

export default Nav