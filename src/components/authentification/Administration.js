import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
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
            <LinkContainer className={hiddenOrNot} to="/admin/users">
                <Nav.Link >Administration</Nav.Link>
            </LinkContainer>
        </>
    )
}