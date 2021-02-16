import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { add_user } from "../../redux/actions/actionCreatorUser";

function FormUser({ add, userUpdated }) {

    const [user, setUser] = useState({ lastname: '', firstname: '', password: '', email: '', username: '' });

    const onBlur = (e) => {
        add(user);
    }

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    return (
        <Form>
            <Form.Group controlId="lastname">
                <Form.Label>Nom de famille</Form.Label>
                <Form.Control type="text" placeholder="Entrez votre nom de famille" value={user.lastname} onBlur={onBlur} onChange={onChange} required />
            </Form.Group>

            <Form.Group controlId="firstname">
                <Form.Label>Prénom</Form.Label>
                <Form.Control type="text" placeholder="Entrez votre prénom" value={user.firstname} onBlur={onBlur} onChange={onChange} required />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre adresse email" value={user.email} onBlur={onBlur} onChange={onChange} required />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Entrez votre mot de passe" value={user.password} onBlur={onBlur} onChange={onChange} required />
            </Form.Group>

            <Form.Group controlId="username">
                <Form.Label>Pseudonyme</Form.Label>
                <Form.Control type="text" placeholder="Entrez votre pseudonyme" value={user.username} onBlur={onBlur} onChange={onChange} required />
            </Form.Group>
        </Form>
    )

}

const mapDispatchToProps = (dispatch) => {
    return { add: (user) => dispatch(add_user(user)) }
}

export default connect(null, mapDispatchToProps)(FormUser)