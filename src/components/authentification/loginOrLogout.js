import { faSignOutAlt, faUser, faUserCog, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

export default function LoginOrLogout() {
    const userAuth = useSelector(state => state.userAuth);

    return (
        <>
            {
                !userAuth.isLogged ? (
                    <LinkContainer to="/login">
                        <Nav.Link><FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon> Se connecter</Nav.Link>
                    </LinkContainer>

                ) : (
                        <>
                            <NavDropdown alignRight title={userAuth.username} id="basic-nav-dropdown">
                                <NavDropdown.Item href={'/profil/' + userAuth.username}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Mon profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout"><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Se déconnecter</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )
            }
        </>
    )
}