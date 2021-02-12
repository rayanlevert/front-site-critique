import { ADD_USER } from "../actionTypes";

const initialState = { user: {lastname: '', firstname: '', password: '', email: '', username: ''} }

const reducer = (state = initialState, action) => {
    console.log("state", state);
    switch (action.type) {
        case ADD_USER:
            const user = action.payload;
            return user;
            break;
    
        default:
            break;
    }
}

export default reducer;