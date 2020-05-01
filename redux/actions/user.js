export const SET_USER = "SET_USER";
export const SET_USERNAME = "SET_USERNAME";
export const SET_REGISTERED_USER = "SET_REGISTERED_USER";

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setUsername = (user) => {
  return {
    type: "SET_USERNAME",
    payload: user,
  };
};

export const setRegisteredUser = () => {
  return (dispatch, getState) => {
    const { user } = getState().user;
    return dispatch({ type: SET_REGISTERED_USER, payload: user });
  };
};
