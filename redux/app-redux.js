import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import * as firebase from "firebase/app";
import "firebase/firestore";

const initialState = {
  user: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };

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

const getUser = () => {
  return function (dispatch) {
    const { displayName } = firebase.auth().currentUser;

    dispatch(setUser(displayName));
  };
};

export { setUser, getUser };
