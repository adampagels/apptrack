import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

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

export { setUser, setRegisteredUser, updateUser };
