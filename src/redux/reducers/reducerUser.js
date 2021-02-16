import { ADD_USER } from "../actionTypes";

const initialState = { user: {lastname: '', firstname: '', password: '', email: '', username: ''} }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            const user = action.payload;
            return user;
            break;
    
        default:
            return state;
            break;
    }
}

export default reducer;