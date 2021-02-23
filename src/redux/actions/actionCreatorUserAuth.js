import { LOGIN, LOGOUT, REMOVE, SIGNIN, UPDATE } from "../actionTypes";

export function login(userAuth) {
    return { type: LOGIN, payload: userAuth }
}

export function logout() {
    return { type: LOGOUT }
}

export function signin(userSignedIn) {
    return { type: SIGNIN, payload: userSignedIn }
}

export function update(userUpdated) {
    return { type: UPDATE, payload: userUpdated }
}

export function remove() {
    return { type: REMOVE }
}