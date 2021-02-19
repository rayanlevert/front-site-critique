import { render } from "@testing-library/react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../redux/actions/actionCreatorUserAuth";

function Logout({ logout }) {
    const [redirect, setRedirect] = useState(false);

    logout();

    setTimeout(() => {
        setRedirect(true);
    }, 2000);

    return (
        <>
            <Alert variant="info" show={true}>{"Vous venez de vous déconnecter. \nVous allez être redirigé vers la page d'accueil..."}</Alert>
            { redirect && <Redirect to="/"></Redirect>}
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return { logout: () => dispatch(logout()) }
}

export default connect(null, mapDispatchToProps)(Logout)