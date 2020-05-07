export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";
import * as firebase from "firebase/app";

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const deleteUser = () => {
  return function (dispatch) {
    const userId = firebase.auth().currentUser || {};
    userId
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_USER" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
