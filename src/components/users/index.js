import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component, useEffect, useState } from "react";
import { faBan, faCheck, faCoffee, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Role from "./Role";
import "../../styles/users/index.css";
import AddUser from "./addUser";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import { ProfileUser } from "./profileUser";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function User({ history }) {

    const [users, setUsers] = useState([]);

    const user = useSelector(state => state.userAuth);

    useEffect(() => {
        fetch('http://localhost:8080/api/users/getAll')
            .then(response => {
                response.json().then(users => {
                    setUsers(users);
                })
            })
    }, []);

    const profileOnClick = (id) => {
        history.push(`/profile/${id}`);
    }

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
                                {users.map(user =>
                                    <tr key={user.id}>
                                        <td>
                                            <Link onClick={() => profileOnClick(user.id)}>{user.lastname.toUpperCase() + ' ' + user.firstname}<br /></Link>
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


export default withRouter(User);