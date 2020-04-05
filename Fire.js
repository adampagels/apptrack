import { firebaseConfig } from "./config";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { decode, encode } from "base-64";

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = (byteArray) => {
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random());
  }
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  addJob = (companyName, jobTitle, wage, location, interview) => {
    this.firestore.collection("jobs").add({
      companyName,
      jobTitle,
      wage,
      location,
      interview,
      uid: this.uid,
      timestamp: this.timestamp,
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
