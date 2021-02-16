import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { faBan, faCheck, faCoffee, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Role from "./Role";
import "../../styles/users/index.css";
import AddUser from "./addUser";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import { ProfileUser } from "./profileUser";
import { withRouter } from"react-router-dom"; 

class User extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/users/getAll');
        const users = await response.json();
        this.setState({ users });
    }

    profileOnClick(id) {
        this.props.history.push(`/profile/${id}`);
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
                                                <Link onClick={() => this.profileOnClick(user.id)}>{user.lastname.toUpperCase() + ' ' + user.firstname}<br /></Link>
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

export default withRouter(User);