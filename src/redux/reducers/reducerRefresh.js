import { ADD_USER } from "../actionTypes";

const initialState = 0;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            state = state+1;
            return state;
            break;
    
        default:
            return state;
            break;
    }
}

export default reducer;