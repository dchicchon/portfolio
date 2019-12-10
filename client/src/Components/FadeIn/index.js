import React from 'react';
import './style.css';

// Great man
// \https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4

function FadeIn(props) {
    const [isVisibile, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        // return () => observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisibile ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    )
}

export default FadeIn;