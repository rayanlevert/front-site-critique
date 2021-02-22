import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { have_users_been_edited } from "../../redux/actions/actionCreatorRefresh";
import roleToString from "../Role/roleToString";

function AddUser({is_refreshed}) {
    const ROLES = ["ROLE_ADMIN"];

    const [open, isOpen] = useState(false);
    const [variant, setVariant] = useState("danger");
    const [visible, setVisible] = useState(false);

    const handleOpen = () => isOpen(true);
    const handleClose = () => isOpen(false);

    const [user, setUser] = useState({ lastname: '', firstname: '', password: '', email: '', username: '', roles: [] });

    const onBlur = (e) => {
    }

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const onChangeRoles = (e) => {
        let object;
        const array = [];
        if(e.target.checked) {
            object = {"name": e.target.id}
            array.push(object);
        } else {
            const index = array.indexOf(object);
            array.splice(index, 1);
        }
        setUser({...user, roles: array});
    }
    
    const displayAlert = (variant, message) => {
        setVisible(true);
        setVariant(variant);
        let alert = document.getElementById('alert');
        alert.textContent = message;
    }

    const handleSubmit = () => {
        if (user.lastname !== "" && user.firstname !== "" && user.email !== "" && user.password !== "" && user.username !== "") {
            fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(body => body.json().then(response => {
                    if (response.status === "OK") {
                        displayAlert("success", response.message);
                        setTimeout(() => {
                            setVisible(false);
                            is_refreshed();
                            handleClose();
                        }, 1000);
                    } else displayAlert("danger", response.message);
                }))
                .catch(error => console.log(error))
        } else {
            alert("Veuillez renseigner tous les champs.");
        }
    }

    return (
        <>
            <Button size="sm" onClick={handleOpen}>
                Créer un utilisateur
            </Button>

            <Modal show={open} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Créer un utilisateur</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert id="alert" variant={variant} show={visible}></Alert>
                    <Form>
                        <Row style={{ marginTop: "3rem" }}>
                            <Col sm={4}>
                                <b>GENERAL</b>
                                <hr class="solid"></hr>
                                <Form.Group controlId="lastname">
                                    <Form.Label>Nom de famille</Form.Label>
                                    <Form.Control type="text" placeholder="Entrez votre nom de famille" value={user.lastname} onBlur={onBlur} onChange={onChange} required />
                                </Form.Group>

                                <Form.Group controlId="firstname">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" placeholder="Entrez votre prénom" value={user.firstname} onBlur={onBlur} onChange={onChange} required />
                                </Form.Group>

                                <Form.Group controlId="username">
                                    <Form.Label>Pseudonyme</Form.Label>
                                    <Form.Control type="text" placeholder="Entrez votre pseudonyme" value={user.username} onBlur={onBlur} onChange={onChange} required />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <b>AUTHENTIFICATION</b>
                                <hr class="solid"></hr>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Entrez votre adresse email" value={user.email} onBlur={onBlur} onChange={onChange} required />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="Entrez votre mot de passe" value={user.password} onBlur={onBlur} onChange={onChange} required />
                                </Form.Group>
                            </Col>

                            <Col sm={4}>
                                <b>ROLES</b>
                                <hr class="solid"></hr>

                                <Form.Group controlId="roles">
                                    <Form.Label>Rôles</Form.Label>
                                    {
                                        ROLES.map((role) => <Form.Check onChange={onChangeRoles} custom type="checkbox" id={role} label={roleToString(role)} required />)
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                    <Button variant="primary" onClick={handleSubmit}>Sauvegarder</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return { is_refreshed: () => dispatch(have_users_been_edited()) }
}

export default connect(null, mapDispatchToProps)(AddUser)

