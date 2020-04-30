import { ADD_JOB, FETCH_JOBS } from "../actions/job";

const initialState = {
  jobs: []
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOB:
      return state;
    case FETCH_JOBS:
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
};

export default jobReducer;
