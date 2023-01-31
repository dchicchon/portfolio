import { Link, useLocation, Navigate } from "react-router-dom";
import "./Error.css";

const redirectMap = {
  '/polus': '/projects/polus-site'
}

const SadSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={500} height={500}>
      <g>
        <path
          vectorEffect="non-scaling-stroke"
          d="M244.6 30.15C135.426 30.15 47 118.576 47 227.75c0 109.174 88.426 197.6 197.6 197.6 109.174 0 197.6-88.426 197.6-197.6 0-109.174-88.426-197.6-197.6-197.6z"
          fill="#85ceff"
        />
        <path
          vectorEffect="non-scaling-stroke"
          d="M244.6 62.26c-91.39 0-165.49 74.1-165.49 165.49 0 91.39 74.1 165.49 165.49 165.49 91.39 0 165.49-74.1 165.49-165.49 0-91.39-74.1-165.49-165.49-165.49z"
          fill="rgb(28, 35, 51)"
        />
        <path
          vectorEffect="non-scaling-stroke"
          d="M344.882 311.73c2.964 5.434.988 11.856-4.446 14.326-5.434 2.964-11.856.988-14.326-4.446-13.338-25.194-45.448-41.99-81.51-41.99-36.062 0-68.172 16.302-81.51 41.99-2.964 5.434-9.386 7.41-14.326 4.446-5.434-2.964-7.41-9.386-4.446-14.326 17.29-32.11 56.316-52.858 100.282-52.858 43.966 0 82.992 20.748 100.282 52.858zm-21.736-136.344c-13.338 0-24.206 10.868-24.206 24.206s10.868 24.206 24.206 24.206 24.206-10.868 24.206-24.206-10.868-24.206-24.206-24.206zm-157.092 48.412c13.338 0 24.206-10.868 24.206-24.206s-10.868-24.206-24.206-24.206-24.206 10.868-24.206 24.206 10.868 24.206 24.206 24.206z"
          fill="#85ceff"
        />
      </g>
    </svg>
  );
};

const Error = ({ message }) => {
  const location = useLocation();
  if (Object.keys(redirectMap).includes(location.pathname)) {
    return <Navigate to={{ pathname: redirectMap[location.pathname] }} />
  }
  const errorMessage = message || "Oops! This page does not exist"
  return (
    <>
      {/* <Navbar /> */}
      <div className="errorPage">
        <h2>{errorMessage}</h2>
        <SadSVG />

        <Link to="/">
          <h2 id="error-link">Home</h2>
        </Link>
      </div>
      {/* <Footer color="rgb(36, 35, 35)" /> */}
    </>
  );
};

export default Error;