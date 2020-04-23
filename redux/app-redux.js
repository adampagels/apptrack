import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import "firebase/firestore";
import * as firebase from "firebase/app";

const initialState = {
  user: null,
  email: null,
  password: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "updateUser":
      return { ...state, user: action.payload };
    case "setRegisteredUser":
      return { ...state, user: action.payload };
    case "addJob":
      return state;
    default:
      return state;
  }
};

// Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

// Action Creators
const setUser = (user) => {
  return {
    type: "setUser",
    payload: user,
  };
};

const updateUser = (user) => {
  return {
    type: "updateUser",
    payload: user,
  };
};

const setRegisteredUser = () => {
  return (dispatch, getState) => {
    const { user } = getState().user;
    return dispatch({ type: setRegisteredUser, payload: user });
  };
};

const addJob = (jobInfo) => {
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
        dispatch({ type: "addJob", jobInfo });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export { setUser, setRegisteredUser, updateUser, addJob };
