import React from "react";
import { storage } from "../../Utils/firebaseConfig";
// import axios from "axios";
import "./style.css";

// https://firebase.google.com/docs/storage/web/list-files
// https://stackoverflow.com/questions/37335102/how-to-get-a-list-of-all-files-in-cloud-storage-in-a-firebase-app

// Components
import Photo from "../../Components/Photo";

// This Page will have to make a call to the server to serve up the images that I send it from my unsplash account
class Photography extends React.Component {
  state = {
    photos: []
  };

  // Listing all the urls
  listAllFiles = () => {
    let unsplashRef = storage.ref("Unsplash");
    let urlsList = [];
    unsplashRef
      .listAll()
      .then(result => {
        result.items.forEach(imageRef => {
          imageRef.getDownloadURL().then(url => {
            // If the url exists, push the url to the urlList
            if (url) {
              urlsList.push(url);
            }

            // Have a better way of doing this in the future
            if (urlsList.length > 5) {
              console.log("Return URLs");
              console.log(urlsList);
              this.setState({
                photos: urlsList
              });
            }
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.listAllFiles();
  }

  render() {
    return (
      <div id="photography">
        <h1>Photography</h1>
        <section className="container">
          {this.state.photos
            ? this.state.photos.map((photo, i) => (
                <Photo src={photo} key={i} alt={`${photo}img`} />
              ))
            : "Loading..."}
          {/* <Gallery /> */}
          {/* Here is where I append all of my photos */}
        </section>
      </div>
    );
  }
}

export default Photography;
