import { LOAD_MOVIES_CREATE_SUBMITTED, 
            LOAD_MOVIES_PAGE, 
            UNLOAD_MOVIES_PAGE, 
            LOAD_MOVIES_CREATE,
            MOVIE_VIEW_PAGE_LOAD 
        } from "../../actionTypes";


export function load_movies_create_submitted(movieValue)
{
    return{ type: LOAD_MOVIES_CREATE_SUBMITTED, payload : movieValue }
}
export function movie_view_page_load(id)
{
    return{ type: MOVIE_VIEW_PAGE_LOAD, payload: id }
}
