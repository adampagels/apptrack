import React from "react";

import { firebaseConfig } from "./config";
import Navigation from "./navigation/Navigation";
import * as firebase from "firebase";

//Fix "can't find variable: Crypto" error
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//

export default function App() {
  return <Navigation />;
}
