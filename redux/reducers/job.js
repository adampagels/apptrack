import {
  ADD_JOB,
  FETCH_JOBS,
  DELETE_ALL_JOBS,
  DELETE_JOB,
} from "../actions/job";

const initialState = {
  jobs: [],
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOB:
      return state;
    case FETCH_JOBS:
      return { ...state, jobs: action.payload };
    case DELETE_ALL_JOBS:
      return state;
    case DELETE_JOB:
      return state;
    default:
      return state;
  }
};

export default jobReducer;
