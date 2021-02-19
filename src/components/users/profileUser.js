import { faBan, faExclamationTriangle, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { update } from "../../redux/actions/actionCreatorUserAuth";
import "../../styles/users/index.css";
import Role from "./Role";

export function ProfileUser({update_user}) {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const userAuth = useSelector(state => state.userAuth);

    const [openPassword, isOpenPassword] = useState(false);
    const [password, setPassword] = useState({ rawPassword: '', encodedPassword: '' });

    const [openDelete, isOpenDelete] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    const [verif, setVerif] = useState(false);

    const [variant, setVariant] = useState("danger");
    const [redirect, setRedirect] = useState(false);

    const handleOpenPassword = () => {
        if (!verif) isOpenPassword(true);
    }
    const handleClosePassword = () => isOpenPassword(false);

    const handleCloseDelete = () => isOpenDelete(false);
    const handleOpenDelete = () => isOpenDelete(true);


    useEffect(() => {
        if (userAuth.userId !== user.id || !userAuth.roles.includes("ROLE_ADMIN")) {
            <Redirect to="/"></Redirect>
        }

        fetch(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                response.json().then(user => {
                    setUser(user);
                    setPassword({ ...password, encodedPassword: user.password })
                })
            });
    }, []);

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });

        if (id === "passwordVerif") {
            setUser({ ...user, password: e.target.value })
        }
    }

    const displayAlert = (variant, message, id) => {
        setVariant(variant);
        console.log(id);

        switch(id) {
            case "alertDelete":
                setVisibleDelete(true);
            case "alertSave":
                setVisibleSave(true);
        }

        let alert = document.getElementById(id);
        alert.textContent = message;

        setTimeout(() => {
            if (id === "alertDelete") {
                setRedirect(true);
            } else setVisibleSave(false);
        }, 1500);


    }

    const handleSubmitPasswordVerif = (e) => {
        fetch("http://localhost:8080/api/users/checkPassword", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(password)
        }).then(response => {
            if (response.status === 200) {
                setVerif(true);
                setVisiblePassword(false);
                setUser({ ...user, password: password.rawPassword })
                handleClosePassword();
            } else setVisiblePassword(true);
        })
    }

    const onChangePasswordVerif = (e) => {
        setPassword({ ...password, rawPassword: e.target.value });
    }

    const handleSubmitSave = () => {
        fetch("http://localhost:8080/api/users/update", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => {
            response.json().then(response => {
                if (response.status === "OK") {
                    displayAlert("success", response.message, "alertSave");
                    update_user(user);
                }
            })
        });
    }

    const handleSubmitDelete = () => {
        fetch(`http://localhost:8080/api/users/delete/${id}`, {
            method: 'DELETE'
        }).then(response => response.json().then(response => {
            if (response.status === "OK") {
                displayAlert("success", response.message, "alertDelete");
            } else displayAlert("info", response.message, "alertDelete");
        }))
    }

    return (
        <>
            <h1>Bienvenue sur votre page de profil {user.firstname} !</h1>
            <small>Vous pouvez ici modifier chaque champ de votre choix.</small>
            <Alert variant={variant} id="alertSave" show={visibleSave}></Alert>

            <Container fluid className="containerProfilUser justify-content-around">
                <Row style={{ marginTop: "3rem" }}>
                    <Col sm={4}>
                        <b>GENERAL</b>
                        <hr class="solid"></hr>
                        <Form className="formProfile">
                            <Form.Group controlId="lastname">
                                <Form.Label>Nom de famille</Form.Label>
                                <Form.Control type="text" value={user.lastname} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group controlId="firstname">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" value={user.firstname} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group controlId="username">
                                <Form.Label>Pseudonyme</Form.Label>
                                <Form.Control type="text" value={user.username} onChange={onChange} required />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col sm={4}>
                        <b>DETAILS DU COMPTE</b>
                        <hr class="solid"></hr>

                        <Form className="formProfile">
                            <Form.Group controlId="email">
                                <Form.Label>Adresse email</Form.Label>
                                <Form.Control type="email" value={user.email} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group controlId="passwordVerif">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" value={user.password} onClick={handleOpenPassword} onChange={onChange} required />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col sm={2}>
                        <b>ROLES</b>
                        <hr class="solid"></hr>
                        <Role roles={user.roles}></Role>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Button variant="primary" size="sm" onClick={handleSubmitSave}><FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Modifier</Button> &nbsp;
                        <Button variant="danger" size="sm" onClick={handleOpenDelete}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon> Effacer le profil</Button>
                    </Col>
                </Row>
            </Container>

            <Modal show={openPassword} onHide={handleClosePassword} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer votre ancien mot de passe avant de le modifier</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert id="alertDelete" variant="danger" show={visiblePassword}>Le mot de passe est incorrect.</Alert>
                    <Form>
                        <Form.Group controlId="passwordVerif">
                            <Form.Label>Ancien mot de passe</Form.Label>
                            <Form.Control type="password" required onChange={onChangePasswordVerif} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePassword}>Fermer</Button>
                    <Button variant="primary" onClick={handleSubmitPasswordVerif}>Appliquer</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={openDelete} onHide={handleCloseDelete} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> Etes vous sur de vouloir supprimer ce compte?<br />
                            <small>Attention, cette action est irréversible.</small>
                        </p>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert variant={variant} id="alertDelete" show={visibleDelete}></Alert>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>Fermer</Button>
                    <Button variant="danger" onClick={handleSubmitDelete}>Supprimer</Button>
                </Modal.Footer>
            </Modal>

            { redirect && <Redirect to="/"></Redirect> }
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return { update_user: (userUpdated) => dispatch(update(userUpdated)) }
}

export default connect(null, mapDispatchToProps)(ProfileUser)