import { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap";

export default function LoginOrLogout() {
    const user = useSelector(state => state.userAuth);
    
    return (
        <>
            {
                !user.isLogged ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Se connecter</Nav.Link>
                    </LinkContainer>

                ) : (
                        <>
                            <Nav className="navbar-right">
                                <NavDropdown alignRight title={user.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href={'/profile/' + user.userId}>Mon profil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout">Se déconnecter</NavDropdown.Item>
                                </NavDropdown>

                            </Nav>
                        </>
                    )
            }
        </>
    )
}