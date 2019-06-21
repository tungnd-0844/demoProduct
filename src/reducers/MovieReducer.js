import {
  FETCH_MOVIES,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIES_SUCEESS
} from "../actions/actionType";

const initialState = {
  data: [],
  page: 1,
  isFetching: false
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        isFetching: true,
        page: state.page
      };
    case FETCH_MOVIES_SUCEESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case FETCH_MOVIES_FAIL:
      return {
        data: [],
        isFetching: false
      };
    default:
      return state;
  }
};

export default dataReducers;
