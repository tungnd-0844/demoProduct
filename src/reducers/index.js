import { combineReducers } from "redux";
import dataMovie from "./MovieReducer";
import dataCast from "./DetailMovieReducer";

const allReducers = combineReducers({
  dataMovie,
  dataCast
});

export default allReducers;
