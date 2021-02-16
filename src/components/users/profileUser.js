import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Modal, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../styles/users/index.css";
import FormUser from "./FormUser";
import Role from "./Role";

export function ProfileUser() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [open, isOpen] = useState(false);
    const [password, setPassword] = useState({ rawPassword: '', encodedPassword: '' });
    const [visible, setVisible] = useState(false);
    const [verif, setVerif] = useState(false);

    const handleOpen = () => {
        if (!verif) isOpen(true);
    }

    const handleClose = () => isOpen(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                response.json().then(user => {
                    setUser(user);
                    setPassword({ ...password, encodedPassword: user.password })
                    console.log(user);
                })
            });
    }, []);

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });

        if (id === "passwordVerif") {
            console.log(e.target.value);
            setUser({ ...user, password: e.target.value })
        }
    }

    const handleSubmitPasswordVerif = (e) => {
        fetch("http://localhost:8080/api/users/checkPassword", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(password)
        }).then(response => {
            if (response.status === 200) {
                setVerif(true);
                setVisible(false);
                setUser({ ...user, password: password.rawPassword })
                handleClose();
            } else setVisible(true);
        })
    }



    const onChangePasswordVerif = (e) => {
        setPassword({ ...password, rawPassword: e.target.value });
    }

    const handleSubmit = () => {
        fetch("http://localhost:8080/api/users/update", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => console.log(response));
    }

    return (
        <>
            <h1>Bienvenue sur votre page de profil {user.firstname} !</h1>
            <small>Vous pouvez ici modifier chaque champ de votre choix.</small>
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
                                <Form.Control type="password" value={user.password} onClick={handleOpen} onChange={onChange} required />
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
                    <Col sm={12}>
                        <Button variant="primary" size="sm" onClick={handleSubmit}>Sauvegarder</Button>
                    </Col>
                </Row>
            </Container>

            <Modal show={open} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer votre ancien mot de passe avant de le modifier</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert id="alert" variant="danger" show={visible}>Le mot de passe est incorrect.</Alert>
                    <Form>
                        <Form.Group controlId="passwordVerif">
                            <Form.Label>Ancien mot de passe</Form.Label>
                            <Form.Control type="password" required onChange={onChangePasswordVerif} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                    <Button variant="primary" onClick={handleSubmitPasswordVerif}>Appliquer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}