import { ADD_USER } from "../actionTypes";

export function add_user(user) {
    return { type: ADD_USER, payload: user }
}