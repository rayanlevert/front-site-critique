import {
    LOAD_MOVIES_PAGE, 
    UNLOAD_MOVIES_PAGE,
    LOAD_MOVIES_CREATE,
    LOAD_MOVIES_CREATE_SUBMITTED,
    MOVIE_VIEW_PAGE_LOAD,
    LOAD_MOVIES_UPDATE_SUBMITTED

} from '../../actionTypes';
const initialState = {movie:{
            title: "",
            reviews: [],
            publishDate: null,
            creationArticleDate: null,
            minAge: null,
            valid: false,
            realisator: "",
            genre: "",
            actors: "",
            duration: null,
            nationality: "",
            synopsys: "",
            webContent: null
}};
const moviesReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case LOAD_MOVIES_PAGE :
            return{
                ...state,
                movie: action.payload.movie
            };

        case UNLOAD_MOVIES_PAGE : return {};

        case LOAD_MOVIES_CREATE : 
        console.log('MOVIES CREATE RED');
            return state;

        case MOVIE_VIEW_PAGE_LOAD :
            console.log(...state);
            return{
                ...state,
                id: action.payload.id
            };
        case LOAD_MOVIES_CREATE_SUBMITTED:
            return{
                movie : action.payload
            }
        case LOAD_MOVIES_UPDATE_SUBMITTED:
            return {
                movieEdit : action.payload
            };
        default:
            return state
    }
}
export default moviesReducer;