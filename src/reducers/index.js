import { combineReducers } from "redux";
import dataMovie from "./MovieReducer";
import dataCast from "./DetailMovieReducer";
import dataCastDetail from "./CastDetailReducer";
import dataSearch from "./SearchDetailReducer";

const allReducers = combineReducers({
  dataMovie,
  dataCast,
  dataCastDetail,
  dataSearch
});

export default allReducers;
