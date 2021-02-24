import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { have_users_been_edited } from "../../redux/actions/actionCreatorRefresh";
import roleToString from "../Role/roleToString";

function AddUser({ is_refreshed }) {
    const ROLES = ["ROLE_ADMIN"];
    const CIVILITE = ["M", "Mme", "Mlle"];
    const [civiliteChecked, setCiviliteChecked] = useState({ M: false, Mme: false, Mlle: false });

    const [open, isOpen] = useState(false);
    const [variant, setVariant] = useState("");
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [alertMessage, setAllertMessage] = useState("");

    const handleOpen = () => isOpen(true);
    const handleClose = () => isOpen(false);

    const [user, setUser] = useState({ civilite: '', lastname: '', firstname: '', age: 0, password: '', email: '', username: '', description: '', roles: [] });
    
    const displayAlert = (variant, message) => {
        setVisible(true);
        setVariant(variant);
        setAllertMessage(message);
    }

    const onBlur = (e) => {
    }

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeRoles = (e) => {
        let object;
        const array = [];
        if (e.target.checked) {
            object = { "name": e.target.id }
            array.push(object);
        } else {
            const index = array.indexOf(object);
            array.splice(index, 1);
        }
        setUser({ ...user, roles: array });
    }

    const onChangeCivilite = (e) => {
        if (e.target.checked) {
            setUser({ ...user, civilite: e.target.id })
            setCiviliteChecked({ [e.target.id]: true });
        }
    }

    const handleSubmit = () => {
        if (user.lastname !== "" && user.firstname !== "" && user.email !== "" && user.password !== "" && user.username !== "") {
            if (user.password === password) {
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
                displayAlert("danger", "Les mots de passe ne correspondent pas.")
            }
        } else {
            displayAlert("info", "Veuillez renseigner tous les champs.")
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
                    <Alert id="alert" variant={variant} show={visible}>{alertMessage}</Alert>
                    <Form>
                        <Row style={{ marginTop: "3rem" }}>
                            <Col sm={4}>
                                <b>GENERAL</b>
                                <hr class="solid"></hr>
                                <Form.Group controlId="civilite">
                                    <Form.Label>Civilite</Form.Label>
                                    {
                                        CIVILITE.map((civilite) => <Form.Check onChange={onChangeCivilite} id={civilite} custom type="radio" label={civilite} checked={civiliteChecked[civilite]} required></Form.Check>)
                                    }
                                </Form.Group>

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

                                <Form.Group controlId="age">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="number" placeholder="Entrez votre âge" value={user.age} onBlur={onBlur} onChange={onChange} required />
                                </Form.Group>
                            </Col>
                            <Col sm={5}>
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

                                <Form.Group controlId="passwordCheck">
                                    <Form.Label>Confirmez le mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="Confirmez votre mot de passe" value={password} onChange={onChangePassword} required />
                                </Form.Group>
                            </Col>

                            <Col sm={3}>
                                <b>ROLES</b>
                                <hr class="solid"></hr>

                                <Form.Group controlId="roles">
                                    {
                                        ROLES.map((role) => <Form.Check onChange={onChangeRoles} custom type="checkbox" id={role} label={roleToString(role)} required />)
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="description">
                                    <Form.Label>Décrivez-vous en quelques lignes!</Form.Label>
                                    <Form.Control as="textarea" rows="3" placeholder="Votre description" value={user.description} onChange={onChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="catchPhrase">
                                    <Form.Label>Dites-nous votre phrase d'accroche</Form.Label>
                                    <Form.Control as="textarea" rows="1" placeholder="Ecrivez votre phrase d'accroche" value={user.catchPhrase} onChange={onChange} required />
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

