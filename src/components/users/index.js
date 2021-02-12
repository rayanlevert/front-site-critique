import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { faBan, faCheck, faCoffee, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, Table } from "react-bootstrap";
import Role from "./Role";
import "../../styles/users/index.css";
import AddUser from "./addUser";

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/users/getAll');
        const users = await response.json();
        this.setState({ users });
        console.log(users[0].roles[0].name);
    }

    render() {
        return (
            <>
                <Container fluid className="containerListUsers justify-content-around">
                    <h1><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Liste des comptes d'utilisateur</h1>
                    <p>
                        <AddUser></AddUser>
                    </p>
                    <Row>
                        <Col sm={8}>
                            <Table striped hover size="sm">
                                <thead className="text-left">
                                    <tr>
                                        <th>Utilisateur</th>
                                        <th>Adresse email</th>
                                        <th className="text-center">Actif</th>
                                    </tr>
                                </thead>
                                <tbody className="text-left">
                                    {this.state.users.map(user =>
                                        <tr key={user.id}>
                                            <td>
                                                &bull; {user.lastname.toUpperCase() + ' ' + user.firstname}<br />
                                                <Role roles={user.roles}></Role>
                                                login : <em>{user.username}</em>
                                            </td>
                                            <td>{user.email}</td>
                                            <td className="text-center">{user.enabled ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faBan} />}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}