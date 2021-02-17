import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { add_user } from "../../redux/actions/actionCreatorUser";
import roleToString from "../Role/roleToString";

function FormUser({ add }) {
    const ROLES = ["ROLE_ADMIN"];

    const [user, setUser] = useState({ lastname: '', firstname: '', password: '', email: '', username: '', roles: [] });
    const [role, setRole] = useState([]);

    useEffect(() => {
        add(user);
    }, [user])

    const onBlur = (e) => {
        add(user);
    }

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });
        console.log(user);
    }

    const onChangeRoles = (e) => {
        let object;
        const array = [];
        if(e.target.checked) {
            console.log("ajout");
            object = {"name": e.target.id}
            array.push(object);

        } else {
            console.log("retire");
            const index = array.indexOf(object);
            array.splice(index, 1);
            console.log("oui",array);
        }
        setUser({...user, roles: array});
    }

    return (
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
    )

}

const mapDispatchToProps = (dispatch) => {
    return { add: (user) => dispatch(add_user(user)) }
}

export default connect(null, mapDispatchToProps)(FormUser)