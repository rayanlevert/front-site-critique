import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap";

export default function LoginOrLogout() {
    const userAuth = useSelector(state => state.userAuth);

    return (
        <>
            {
                !userAuth.isLogged ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Se connecter</Nav.Link>
                    </LinkContainer>

                ) : (
                        <LinkContainer to="/logout">
                            <Nav.Link>Se déconnecter</Nav.Link>
                        </LinkContainer>
                    )
            }
        </>
    )
}