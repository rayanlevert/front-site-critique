import {
    LOAD_MOVIES_PAGE, 
    UNLOAD_MOVIES_PAGE,
    LOAD_MOVIES_CREATE,
    LOAD_MOVIES_CREATE_SUBMITTED,
    LOAD_MOVIE_VIEW,
    MOVIE_VIEW_PAGE_LOAD

} from '../../actionTypes';

const moviesReducer = (state = {}, action) => {
    switch(action.type)
    {
        case LOAD_MOVIES_PAGE :
            return{
                ...state,
                movie: action.payload.movie
            };

        case UNLOAD_MOVIES_PAGE : return {};

        case LOAD_MOVIES_CREATE : 
            return state;
        case MOVIE_VIEW_PAGE_LOAD :
            console.log(...state);
            return{
                ...state,
                id: action.payload.id
            };
    }
}
export default moviesReducer