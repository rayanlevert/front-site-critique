import { LOGIN, LOGOUT } from "../actionTypes";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = localStorage.getItem('user') ? { username: user.username, userId: user.userId, roles: user.roles, isLogged: true } : { userAuth: {username: '', password: '', isLogged: false, userId: 0, roles: []} }

const reducer = (state = initialState, action) => {
    let userAuth;
    
    switch (action.type) {
        case LOGIN:
            userAuth = action.payload;
            userAuth.isLogged = true;
            localStorage.setItem('user', JSON.stringify({...userAuth, password:''}));
            return userAuth;
        
        case LOGOUT:
            localStorage.removeItem('user');
            userAuth = {username: '', password: '', isLogged: false, userId: 0 }
            return userAuth;
            
        default:
            return state;
    }
}

export default reducer;