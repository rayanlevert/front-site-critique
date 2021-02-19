import { faUserCog, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

export default function LoginOrLogout() {
    const user = useSelector(state => state.userAuth);
    console.log(user);
    return (
        <>
            {
                !user.isLogged ? (
                    <LinkContainer to="/login">
                        <Nav.Link><FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon> Se connecter</Nav.Link>
                    </LinkContainer>

                ) : (
                        <>
                            <NavDropdown alignRight title={user.username} id="basic-nav-dropdown">
                                <NavDropdown.Item href={'/profile/' + user.userId}>Mon profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Se déconnecter</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )
            }
        </>
    )
}