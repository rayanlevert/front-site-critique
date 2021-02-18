import { useSelector } from "react-redux"
import { Route } from "react-router-dom";
import Unauthorized from "../errorspages/Unauthorized";

export default function ProtectedProfileRoute({ children, ...rest}) {
    const userAuth = useSelector(state => state.userAuth);

    return (
        <>
            <Route {...rest}>
                {
                    userAuth.roles.some(e => e.name === "ROLE_ADMIN") || (userAuth.userId.toString() === rest.computedMatch.params.id) ? children : (
                        <Unauthorized></Unauthorized>
                    )
                }
            </Route>
        </>
    )
}