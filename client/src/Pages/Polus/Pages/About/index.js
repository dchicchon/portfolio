import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import "./style.css";

function About() {
  return (
    <>
      <NavBar />
      <div className='container' style={{ marginTop: '5rem' }}>
        {/* About Section */}
        <h2>About</h2>
        <p className="subheading">
          Polus is a personal planner designed to help you keep track of your
          time throughout the day, week, and month across multiple devices. With
          each new tab you can see your plans and not have to worry about using a physical planner
        </p>

        {/* Maybe place reviews of the app here? */}
        <h2>Reviews</h2>

        {/* Maybe make this scrollable? */}
        <ul className='review-list' style={{ height: '500px' }}>

          <div className='review-card mb-3 card-width'>
            <div className="card-body">
              <div className='review-title'>
                <h5 className='card-title'>Mahathy Sathesh</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </h6>
                <h6 className='card-subtitle text-muted mb-2'>Feb 18, 2021</h6>
              </div>
              <p className='review-text'>     As a fellow procrastinator, this extension really helped me not forget about what I have to submit and finish my assignments. Whenever, I open up my computer, I see the planner and I feel guilty not completing it and overall it just really helped me and is wayyy underrated:).
                Though it would be nice if there was option in which I could customize the background.That's all!</p>
            </div>
          </div>
          <div className='review-card mb-3 card-width'>
            <div className="card-body">
              <div className='review-title'>
                <h5 className='card-title'>Caroline Mai</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>Mar 25, 2020</h6>
              </div>

              <p className='review-text'>Love this extension! I use it every day.</p>
            </div>
          </div>
          <div className='review-card mb-3 card-width'>
            <div className="card-body">
              <div className='review-title'>
                <h5 className='card-title'> Bárbara Sánchez Palomino</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>May 18, 2021</h6>

              </div>


              <p className='review-text'>  Me encanto!</p>
            </div>
          </div>
          <div className='review-card mb-3 card-width'>
            <div className="card-body">
              <div className='review-title'>
                <h5 className='card-title'>  Patricia Fernández</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>May 8, 2021</h6>

              </div>


              <p className='review-text'>
                La imagen se cambia sola, o hay opciones? Me encanta la extensión</p>
            </div>
          </div>
          <div className='review-card mb-3 card-width'>
            <div className="card-body">
              <div className='review-title'>
                <h5 className='card-title'>    Rethabile Ncheke</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>Jun 9, 2021</h6>

              </div>


              <p className='review-text'>
                I love it</p>
            </div>
          </div>







        </ul>

        <p className='col subheading'>
          Coming soon to iOS and Android devices
        </p>

        <span className='col d-flex justify-content-center' style={{ fontSize: '5rem' }}>
          <i className="fab fa-apple"></i>
        </span>
        <span className='col d-flex justify-content-center' style={{ fontSize: '5rem' }}>
          <i className="fab fa-android"></i>
        </span>

      </div>



      <Footer />
    </ >
  );
}

export default About;
