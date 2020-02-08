# new_portfolio

## Learning Points

- Cannot use background fixed for mobile!
- Had Cors issues with Firebase Functions (https://stackoverflow.com/questions/59473214/firebase-functions-not-working-on-firebase-hosted-react-site?noredirect=1#comment105124903_59473214)

### Code Snippets

#### Firebase Storage Retrieval

To begin retrieving files from my storage bucket, I must first download the firebase dependency : `npm i --save firebase`. Afterwards I must initialize firebase with my project config where you can find by going to `Project Settings` in your firebase project console. I can then use the `storage` function from firebase by executing the method `firebase.storage()` and setting it to a storage variable. Be sure to export the storage object so that it can be used anywhere in your app.

`Util/firebaseConfig.js`

```javascript
// Bring in firebase
import firebase from "firebase/app";
import "firebase/storage";

// Enter config from project settings
const config = {
  apiKey: "******************************",
  authDomain: "***********************",
  databaseURL: "**************************",
  projectId: "*************************",
  storageBucket: "*************************",
  messagingSenderId: "*************************",
  appId: "*************************",
  measurementId: "*************************"
};

// initialize
firebase.initializeApp(config);

// Set storage object from firebase
const storage = firebase.storage();

// export to use anywhere in app
export { storage, firebase as default };
```

Next, we want to use methods found within the `storage` object to get references to folders/files from our Google Cloud Storage.

`Photography.js`

```javascript
// Import storage object from firebase config
import { storage } from "../../Utils/firebaseConfig";

// Here we make a reference to the folder in our storage
let unsplashRef = storage.ref("Unsplash");
let urlsList = [];

// Use the reference method 'listAll()' to get a list of all the files within that folder
unsplashRef
  .listAll()
  .then(result => {
    // We get a list of objects that has an image reference from which we want to get the downloadURL.
    result.items.forEach(imageRef => {
      imageRef.getDownloadURL().then(url => {
        // If the url exists, push the url to the urlList
        if (url) {
          let image = {
            url,
            name: imageRef.name
          };
          urlsList.push(image);
        }

        // If we reach the end of the list, we can set our state
        if (urlsList.length === result.items) {
          this.setState({
            photos: urlsList,
            loading: false
          });
        }
      });
    });
  })
  // catch any errors just in case
  .catch(err => {
    console.error(err);
  });
```
