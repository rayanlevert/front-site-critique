import { useEffect, useState } from "react"
import { Alert, Button, Card, Container, Form, ResponsiveEmbed } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { login } from "../../redux/actions/actionCreatorUserAuth";
import { Dot } from 'react-animated-dots';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

function Login({ login }) {
    const [userAuth, setUserauth] = useState({ username: '', password: '', isLogged: false, userId: 0, roles: [] });
    const [redirect, setRedirect] = useState(false);
    const [visible, setVisible] = useState(false);
    const [variant, setVariant] = useState("error");
    const dots = '<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot>';

    useEffect(() => {
        if (userAuth.userId !== 0) {
            login(userAuth);
        }
    }, [userAuth])

    const onChange = (e) => {
        let id = e.target.id;
        setUserauth({ ...userAuth, [e.target.id]: e.target.value });
    }

    const displayAlert = (e, variant, message) => {
        setVisible(true);
        setVariant(variant);
        let alert = document.getElementById('alert');
        alert.textContent = message;
        if (variant === "success") {
            setTimeout(() => {
                setRedirect(true);
            }, 2500);
        }
    }

    const handleOnClick = (e) => {
        if (userAuth.password !== "" && userAuth.username !== "") {
            fetch("http://localhost:8080/api/users/authenticate", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userAuth)
            })
                .then(body => body.json().then(response => {
                    console.log(response);
                    if (response.status === "OK") {
                        const message = "Bon retour parmi nous " + response.subObject.firstname + "!" + "\nVous allez être redirigé vers la page d'accueil...";
                        displayAlert(e, "success", message);
                        setUserauth({ ...userAuth, userId: response.subObject.id, roles: response.subObject.roles })

                    } else {
                        displayAlert(e, "danger", response.message);
                    }
                }))
                .catch(error => console.log("error", error));
        }
    }

    return (
        <>
        <Container>
            <Card className="mt-5">
                <Card.Body>
                                    <h2>Connexion</h2>

                        <h3>Accéder à CritiquesMania</h3>

                        <div>
                            <Alert id="alert" variant={variant} show={visible}></Alert>
                        </div>

                        <Form>

                            <Form.Group style={{ display: "inline-block", width: "50%" }} controlId="username">
                                <Form.Label>Pseudonyme</Form.Label>
    
                                <Form.Control type="text" placeholder="Entrez votre pseudonyme" onChange={onChange} required />
                            </Form.Group>
                            <br />
                            <Form.Group style={{ display: "inline-block", width: "50%" }} controlId="password">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Entrez votre mot de passe" onChange={onChange} required />
                            </Form.Group>
                            <br />
                            <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                                <input type="text" name="email" class="form-control" placeholder="Username"/>
                            </div>
                            <Button onClick={handleOnClick}>Se connecter</Button>

                            {redirect && <Redirect to="/"></Redirect>}
                        </Form>

                        <div>
                            <small>Pas encore de compte? Créez le vôtre dès maintenant!</small><br />
                            <Link to="/signin">Inscrivez-vous!</Link>
                        </div>

                </Card.Body>
            </Card>
        </Container>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return { login: (userAuth) => dispatch(login(userAuth)) }
}

export default connect(null, mapDispatchToProps)(Login)