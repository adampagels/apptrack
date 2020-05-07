import "firebase/firestore";
import * as firebase from "firebase/app";

export const ADD_JOB = "ADD_JOB";
export const FETCH_JOBS = "FETCH_JOBS";
export const DELETE_ALL_JOBS = "DELETE_ALL_JOBS";

export const addJob = (jobInfo) => {
  return function (dispatch) {
    firebase
      .firestore()
      .collection("jobs")
      .add({
        ...jobInfo,
        uid: (firebase.auth().currentUser || {}).uid,
        timestamp: Date.now(),
      })
      .then(() => {
        dispatch({ type: "ADD_JOB", payload: jobInfo });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchJobs = () => {
  return function (dispatch) {
    let jobData = [];
    let userId = (firebase.auth().currentUser || {}).uid;
    firebase
      .firestore()
      .collection("jobs")
      .where("uid", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          jobData.push({ data: doc.data(), id: doc.id });
        });
        dispatch({ type: "FETCH_JOBS", payload: jobData });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteAllJobs = () => {
  return function (dispatch) {
    const userId = (firebase.auth().currentUser || {}).uid;
    firebase
      .firestore()
      .collection("jobs")
      .where("uid", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
        dispatch({ type: "DELETE_ALL_JOBS" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
