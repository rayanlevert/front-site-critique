import { LOGIN, LOGOUT } from "../actionTypes";

export function login(userAuth) {
    return { type: LOGIN, payload: userAuth }
}

export function logout() {
    return { type: LOGOUT }
}