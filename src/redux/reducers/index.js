import { combineReducers } from "redux";
import userAuth from "./reducerUserAuth";
import refresh from "./reducerRefresh"

export default combineReducers( { userAuth, refresh } );