import { combineReducers } from "redux";
import user from "./reducerUser";
import userAuth from "./reducerUserAuth";

export default combineReducers( { user, userAuth } );