import {
  FETCH_CAST_DETEAL,
  FETCH_CAST_DETEAL_FAIL,
  FETCH_CAST_DETEAL_SUCEESS,
  FETCH_MOVIES_BY_CAST,
  FETCH_MOVIES_BY_CAST_FAIL,
  FETCH_MOVIES_BY_CAST_SUCEESS
} from "../actions/actionType";

const initialState = {
  data: [],
  listCast: []
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAST_DETEAL:
      return {
        ...state,
        personId: action.personId
      };
    case FETCH_CAST_DETEAL_SUCEESS:
      return {
        ...state,
        data: action.data
      };
    case FETCH_MOVIES_BY_CAST:
      return {
        ...state,
        castId: action.castId
      };
    case FETCH_MOVIES_BY_CAST_SUCEESS:
      return {
        ...state,
        listCast: action.listCast
      };
    default:
      return state;
  }
};

export default dataReducers;
