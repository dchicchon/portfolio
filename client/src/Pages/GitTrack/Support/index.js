import React from "react";
import { Nav } from '../Nav'
import { Footer } from '../Footer'
import './style.css'
export const Support = () => {
  return (
    <>
      <Nav />
      <div id='gittrack-support'>
        <div id='support-form'>
          <h1>Support</h1>
          <p>Please use the following form to submit your issues with GitTrack</p>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScoqe-oPEjEZvtzRUVU0ZVAsLfR4lLoXq5-k4aD6JT6-5WV4Q/viewform?embedded=true" width="640" height="519" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
        </div>
      </div>
      <Footer />
    </>

  );
};
