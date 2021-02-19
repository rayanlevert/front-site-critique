import { faCog, faGamepad, faUser, faUserLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap";

export default function Administration() {
    const userAuth = useSelector(state => state.userAuth);
    const [hiddenOrNot, setHiddenornot] = useState("d-none");

    useEffect(() => {
        if (userAuth.roles !== undefined && userAuth.roles.some(e => e.name === "ROLE_ADMIN")) {
            setHiddenornot("d-block")
        } else setHiddenornot('d-none');
    }, [userAuth, hiddenOrNot])

    return (
        <>
           <NavDropdown  className={hiddenOrNot} title='Administration' id="basic-nav-dropdown">
                    <NavDropdown.Item  href="/admin/users"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> Listes des utilisateurs</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/listgame" ><FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon> Listes des jeux vidéo</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}