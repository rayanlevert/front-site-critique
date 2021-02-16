import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = { userAuth: {username: '', password: '', isLogged: false, userId: 0} }

const reducer = (state = initialState, action) => {
    let userAuth;

    switch (action.type) {
        case LOGIN:
            userAuth = action.payload;
            userAuth.isLogged = true;
            return userAuth;
        
        case LOGOUT:
            userAuth = {username: '', password: '', isLogged: false, userId: 0 }
            return userAuth;
            
        default:
            return state;
    }
}

export default reducer;