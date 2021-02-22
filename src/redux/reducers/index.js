import { combineReducers } from "redux";
import userAuth from "./reducerUserAuth";
import moviesReducer from "./movies/moviesReducer";
export default combineReducers( {
     user, userAuth,
     moviesReducer 
    } );
