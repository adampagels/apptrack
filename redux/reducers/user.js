import { SET_USER, SET_USERNAME, SET_REGISTERED_USER } from "../actions/user";

const initialState = {
  user: null,
  email: null,
  password: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USERNAME:
      return { ...state, user: action.payload };
    case SET_REGISTERED_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
