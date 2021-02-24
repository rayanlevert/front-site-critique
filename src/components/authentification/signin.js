import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, signin } from "../../redux/actions/actionCreatorUserAuth";
import "../../web/css/users/index.css";

export function SignIn({ sign_in, log_in }) {
    const CIVILITE = ["M", "Mme", "Mlle"];
    const [civiliteChecked, setCiviliteChecked] = useState({ M: false, Mme: false, Mlle: false });

    const [userSignIn, setUserSignin] = useState({ civilite: '', lastname: '', firstname: '', age: 0, password: '', email: '', username: '', description: '', roles: [] });
    const [userLogin, setUserlogin] = useState({ username: '', password: '', isLogged: false, userId: 0, roles: [] });
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false);
    const [variant, setVariant] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        sign_in(userSignIn);
        if (userLogin.userId !== 0) {
            log_in(userLogin);
        }
    }, [userSignIn, userLogin])

    const onChange = (e) => {
        let id = e.target.id;
        setUserSignin({ ...userSignIn, [e.target.id]: e.target.value });
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeCivilite = (e) => {
        if (e.target.checked) {
            setUserSignin({ ...userSignIn, civilite: e.target.id })
            setCiviliteChecked({ [e.target.id]: true });
            console.log(civiliteChecked);
        }
    }

    const displayAlert = (variant, message) => {
        setVariant(variant);
        setVisible(true);
        setAlertMessage(message);
        if (variant == 'success') {
            setTimeout(() => {
                setRedirect(true);
            }, 1500);
        }
    }

    const onClick = (e) => {
        if (userSignIn.email !== "" && userSignIn.lastname !== "" && userSignIn.password !== "" && userSignIn.username !== "" && userSignIn.firstname !== "") {
            if (userSignIn.password === password) {
                fetch("http://localhost:8080/api/users/register", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userSignIn)
                })
                    .then(body => body.json().then(response => {
                        if (response.status === "OK") {
                            setUserlogin({ ...userLogin, username: userSignIn.username, firstname: userSignIn.firstname, userId: response.subObject.id, roles: response.subObject.roles })
                            displayAlert('success', response.message);
                        } else displayAlert('danger', response.message);
                    }))
                    .catch(error => console.log(error))
            } else {
                
            }
        } else {
            
        }
    }

    return (
        <>
        <Container>
        <Card className="mt-3 mb-3">
            <Card.Body>
            <h1>Inscrivez vous, c'est gratuit!</h1>
            <small>Les champs avec * sont obligatoires.</small>
            <Alert id='alert' variant={variant} show={visible}>{alertMessage}</Alert>

            <Form className="formSignin">
                <Row style={{ marginTop: "3rem" }}>
                    <Col sm={4}>
                        <b>GENERAL</b>
                        <hr class="solid"></hr>
                        <Form.Group controlId="civilite">
                            <Form.Label className="test">Civilite*</Form.Label><br />
                            {
                                CIVILITE.map((civilite) => <Form.Check inline onChange={onChangeCivilite} id={civilite} custom type="radio" label={civilite} checked={civiliteChecked[civilite]} required></Form.Check>)
                            }
                        </Form.Group>

                        <Form.Group controlId="lastname">
                            <Form.Label>Nom de famille*</Form.Label>
                            <Form.Control type="text" placeholder="Entrez votre nom de famille" value={userSignIn.lastname} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="firstname">
                            <Form.Label>Prénom*</Form.Label>
                            <Form.Control type="text" placeholder="Entrez votre prénom" value={userSignIn.firstname} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Pseudonyme*</Form.Label>
                            <Form.Control type="text" placeholder="Entrez votre pseudonyme" value={userSignIn.username} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="age">
                            <Form.Label>Age*</Form.Label>
                            <Form.Control type="number" placeholder="Entrez votre âge" value={userSignIn.age} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={4}>
                        <b>AUTHENTIFICATION</b>
                        <hr class="solid"></hr>
                        <Form.Group controlId="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" placeholder="Entrez votre adresse email" value={userSignIn.email} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Mot de passe*</Form.Label>
                            <Form.Control type="password" placeholder="Entrez votre mot de passe" value={userSignIn.password} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="passwordCheck">
                            <Form.Label>Confirmez le mot de passe*</Form.Label>
                            <Form.Control type="password" placeholder="Confirmez votre mot de passe" value={password} onChange={onChangePassword} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="formDesCatch">
                    <Col sm={8}>
                        <Form.Group controlId="description">
                            <Form.Label>Décrivez-vous en quelques lignes!</Form.Label>
                            <Form.Control as="textarea" rows="2" placeholder="Votre description" value={userSignIn.description} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="formDesCatch">
                    <Col sm={8}>
                        <Form.Group controlId="catchPhrase">
                            <Form.Label>Dites-nous votre phrase d'accroche</Form.Label>
                            <Form.Control as="textarea" rows="1" placeholder="Ecrivez votre phrase d'accroche" value={userSignIn.catchPhrase} onChange={onChange} required />
                        </Form.Group>
                        <Button style={{ marginTop: "6%" }} variant="info" size="lg" onClick={onClick}>S'inscrire</Button>
                    </Col>

                </Row>

            </Form>
                </Card.Body>
            </Card>
            </Container>
            {redirect && <Redirect to="/"></Redirect>}
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        sign_in: (userSignIn) => dispatch(signin(userSignIn)),
        log_in: (userSignIn) => dispatch(login(userSignIn))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)