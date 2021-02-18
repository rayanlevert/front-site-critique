import { LOGIN, LOGOUT, SIGNIN } from "../actionTypes";

export function login(userAuth) {
    return { type: LOGIN, payload: userAuth }
}

export function logout() {
    return { type: LOGOUT }
}

export function signin(userSignedIn) {
    return { type: SIGNIN, payload: userSignedIn }
}