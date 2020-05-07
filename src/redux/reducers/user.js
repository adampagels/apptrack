import { SET_USER, DELETE_USER } from "../actions/user";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case DELETE_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
