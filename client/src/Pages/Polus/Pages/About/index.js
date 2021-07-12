import React from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/Navbar";
import "./style.css";

function About() {
  return (
    <>
      <NavBar />
      <div className='container' style={{ marginTop: '5rem' }}>

        {/* About Section */}
        <section className='row'>
          <h2 className='col text-center'>About</h2>
        </section>
        <section className='row'>
          <p className="subheading">
            Polus is a personal planner designed to help you keep track of your
            time throughout the day, week, and month across multiple devices. With
            each new tab you can see your plans and not have to worry about using a physical planner
          </p>
        </section>

        {/* Maybe place reviews of the app here? */}

        <section className='row'>
          <h2 className='col text-center m-3'>Reviews</h2>
        </section>

        <section className='row'>
          {/* Maybe make this scrollable? */}
          <ul className='col list-group align-items-center overflow-auto ' style={{ height: '500px' }}>

            <div className='card mb-3 w-50'>
              <div className="card-body">
                <h5 className='card-title'>Mahathy Sathesh</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>

                <h6 className='card-subtitle text-muted mb-2'>Feb 18, 2021</h6>
                <p className='card-text'>     As a fellow procrastinator, this extension really helped me not forget about what I have to submit and finish my assignments. Whenever, I open up my computer, I see the planner and I feel guilty not completing it and overall it just really helped me and is wayyy underrated:).
                  Though it would be nice if there was option in which I could customize the background.That's all!</p>
              </div>
            </div>
            <div className='card mb-3 w-50'>
              <div className="card-body">
                <h5 className='card-title'>Caroline Mai</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>Mar 25, 2020</h6>

                <p className='card-text'>Love this extension! I use it every day.</p>
              </div>
            </div>
            <div className='card mb-3 w-50'>
              <div className="card-body">
                <h5 className='card-title'> Bárbara Sánchez Palomino</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>May 18, 2021</h6>

                <p className='card-text'>  Me encanto!</p>
              </div>
            </div>
            <div className='card mb-3 w-50'>
              <div className="card-body">
                <h5 className='card-title'>  Patricia Fernández</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>May 8, 2021</h6>

                <p className='card-text'>
                  La imagen se cambia sola, o hay opciones? Me encanta la extensión</p>
              </div>
            </div>

            <div className='card mb-3 w-50'>
              <div className="card-body">
                <h5 className='card-title'>    Rethabile Ncheke</h5>
                <h6 className='card-subtitle text-muted mb-2'>  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i></h6>
                <h6 className='card-subtitle text-muted mb-2'>Jun 9, 2021</h6>

                <p className='card-text'>
                  I love it</p>
              </div>
            </div>







          </ul>
        </section>

        <section className='row'>
          <p className='col subheading'>
            Coming soon to iOS and Android devices
          </p>
        </section>

        <section className='row pt-3 pb-5'>
          <span className='col d-flex justify-content-center' style={{ fontSize: '5rem' }}>
            <i className="fab fa-apple"></i>
          </span>
          <span className='col d-flex justify-content-center' style={{ fontSize: '5rem' }}>
            <i className="fab fa-android"></i>
          </span>
        </section>

      </div>



      <Footer />
    </ >
  );
}

export default About;
