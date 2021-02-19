import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Unauthorized from "../components/errorspages/Unauthorized";

export default function ProtectedAdminRoute({ children, ...rest }) {
    const userAuth = useSelector(state => state.userAuth);

    return (
        <Route {...rest}>
            {
                userAuth.roles.some(e => e.name === "ROLE_ADMIN") ? children : (
                    <Unauthorized></Unauthorized>
                )
            }
        </Route>
    )
}