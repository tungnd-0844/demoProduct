import {
  FETCH_COMMENT_MOVIES,
  FETCH_COMMENT_MOVIES_FAIL,
  FETCH_COMMENT_MOVIES_SUCEESS
} from "../actions/actionType";

const initialState = {
  data: [],
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENT_MOVIES:
      return {
        ...state,
        id: action.Id
      };
    case FETCH_COMMENT_MOVIES_SUCEESS:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default dataReducers;
