import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, signin } from "../../redux/actions/actionCreatorUserAuth";

export function SignIn({sign_in, log_in}) {
    const [userSignIn, setUserSignin] = useState({ lastname: '', firstname: '', password: '', email: '', username: '' });
    const [userLogin, setUserlogin] = useState({ username: '', password: '', isLogged: false, userId: 0, roles: [] });
    const [visible, setVisible] = useState(false);
    const [variant, setVariant] = useState("error");
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

    const displayAlert = (variant, message) => {
        setVariant(variant);
        setVisible(true);
        let alert = document.getElementById('alert');
        alert.textContent = message;
        if (variant == 'success') {
            setTimeout(() => {
                setRedirect(true);
            }, 1500);
        }
    }

    const onClick = (e) => {
        if (userSignIn.email !== "" && userSignIn.lastname !== "" && userSignIn.password !== "" && userSignIn.username !== "" && userSignIn.firstname !== "") {
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
        }
    }

    return (
        <>
            <h1>Inscrivez vous, c'est gratuit!</h1>
            <Alert id='alert' variant={variant} show={visible}></Alert>

            <Form>
                <Row className="formSignin" style={{ marginTop: "3rem" }}>
                    <Col sm={4}>
                        <b>GENERAL</b>
                        <hr class="solid"></hr>
                        <Form.Group controlId="lastname">
                            <Form.Label>Nom de famille</Form.Label>
                            <Form.Control type="text" placeholder="Entrez votre nom de famille" value={userSignIn.lastname} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="firstname">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" placeholder="Entrez votre prénom" value={userSignIn.firstname} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Pseudonyme</Form.Label>
                            <Form.Control type="text" placeholder="Entrez votre pseudonyme" value={userSignIn.username} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col sm={1}></Col>
                    <Col sm={4}>
                        <b>AUTHENTIFICATION</b>
                        <hr class="solid"></hr>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Entrez votre adresse email" value={userSignIn.email} onChange={onChange} required />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Entrez votre mot de passe" value={userSignIn.password} onChange={onChange} required />
                        </Form.Group>

                        <Button style={{ marginTop: "6%" }} variant="info" size="lg" onClick={onClick}>S'inscrire</Button>
                    </Col>
                </Row>
            </Form>

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