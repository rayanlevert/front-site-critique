import { combineReducers } from "redux";
import userAuth from "./reducerUserAuth";
import moviesReducer from "./movies/moviesReducer";
import refresh from "./reducerRefresh"

export default combineReducers( {
     refresh, userAuth,
     moviesReducer 
    } );
