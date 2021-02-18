import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";


export default function ProtectedRoute( { redirectTo, children, ...rest } ){
    const user = useSelector(state => state.userAuth);
    return (
        <Route {...rest}>
            { user.isLogged ? children : <Redirect to={ { pathname: redirectTo }} />  }
        </Route>
    );
}