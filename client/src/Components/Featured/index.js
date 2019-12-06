import React, { useState } from 'react';
import './style.css';

// Components
import Carousel from 'react-bootstrap/Carousel';

// Assets
import gittrack from '../../Assets/images/gittrackLogo.png';
import plannit from '../../Assets/images/planitLogo.png'
import spaceTrivia from '../../Assets/images/spaceLogo.png';
import zooLogo from '../../Assets/images/zooLogo.png';

// const ControlledCarosel = () => {
//     const [index, setIndex] = useState(0); // what is useState?
//     const [direction, setDirection] = useState(null);

//     const handleSelect = (selectedIndex, e) => {
//         setIndex(selectedIndex);
//         setDirection(e.direction)
//     };

//     return (
//         <Carosel activeIndex={index} direction={direction} onSelect={handleSelect}>
//             <Carosel.item>
//                 <img
//                     className='d-block w-100'
//                     src='placeholder.jpg'
//                     alt='first slide'
//                 />
//                 <Carosel.Caption>
//                     <h3>First Slide Label</h3>
//                     <p>This is filler text for now</p>
//                 </Carosel.Caption>
//             </Carosel.item>
//         </Carosel>
//     )

// }

const Featured = () => {
    return (
        <div className='featured'>
            {/* <ControlledCarosel /> */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={gittrack}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={spaceTrivia}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={zooLogo}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/* Here will be a Carosel where I will show my projects */}
        </div>
    )
}

export default Featured