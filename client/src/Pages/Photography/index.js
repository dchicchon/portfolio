import React from "react";

// Firebase
import "./style.css";

// Bootstrap stuff
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

// Utils
import API from "../../Utils/API";

// https://firebase.google.com/docs/storage/web/list-files
// https://stackoverflow.com/questions/37335102/how-to-get-a-list-of-all-files-in-cloud-storage-in-a-firebase-app

// Components
import Navbar from "../../Components/Navbar";
import Photo from "../../Components/Photo";
// import Footer from "../../Components/Footer";

class Photography extends React.Component {
  state = {
    photos: [],
    loading: true,
    phone: false
  };

  // Listing all the urls
  componentDidMount() {
    API.getAllPhotos()
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          photos: res.data,
          // Test for Phone
          phone: window.screen.width < 400
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="photography">
        <Navbar />
        <Container>
          <Row>
            <Col className="m-5">
              <h2 style={{ letterSpacing: "8px" }}>Photography</h2>
            </Col>
          </Row>
          {this.state.loading ? (
            <Row>
              <Col>
                <Spinner animation="border" variant="info" />
              </Col>
            </Row>
          ) : (
            <Row>
              {this.state.phone
                ? this.state.photos.map((photo, i) => (
                    <Photo
                      src={photo.urls.small}
                      key={i}
                      alt={photo.description}
                      download={photo.links.download}
                      user={photo.user.name}
                      userProfile={photo.user.links.html}
                      userImage={photo.user.profile_image.small}
                    />
                  ))
                : this.state.photos.map((photo, i) => (
                    <Photo
                      src={photo.urls.regular}
                      key={i}
                      alt={photo.description}
                      download={photo.links.download}
                      user={photo.user.name}
                      userProfile={photo.user.links.html}
                      userImage={photo.user.profile_image.small}
                    />
                  ))}
            </Row>
          )}
        </Container>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Photography;
