import { LOAD_MOVIES_CREATE_SUBMITTED, 
            MOVIE_VIEW_PAGE_LOAD, 
            LOAD_MOVIES_UPDATE_SUBMITTED
        } from "../../actionTypes";


export function load_movies_create_submitted(movieValue)
{
    return{ type: LOAD_MOVIES_CREATE_SUBMITTED, payload : movieValue }
}
export function movie_view_page_load(id)
{
    return{ type: MOVIE_VIEW_PAGE_LOAD, payload: id }
}
export function load_movies_update_submitted(movieEdit)
{
    
    return{ type : LOAD_MOVIES_UPDATE_SUBMITTED, payload: movieEdit }
}
