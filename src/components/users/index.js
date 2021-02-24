import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component, useEffect, useState } from "react";
import { faBan, faCheck, faCoffee, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Role from "./Role";
import "../../web/css/users/index.css";
import AddUser from "./addUser";
import { useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import PaginationUser from "../pagination/PaginationUser";

function User({ history }) {

    const createItemList = () => {
        let rows = {}
        let counter = 1
        users.forEach((item, idx) => {
            rows[counter] = rows[counter] ? [...rows[counter]] : []
            if (idx % 3 === 0 && idx !== 0) {
                counter++
                rows[counter] = rows[counter] ? [...rows[counter]] : []
                rows[counter].push(item)
            } else {
                rows[counter].push(item)
            }
        })
        return rows
    }

    const getUsers = () => {
        fetch('http://localhost:8080/api/users/getAll')
            .then(response => {
                response.json().then(usersRes => {
                    setUsers(usersRes);
                })
            })
    }

    const [users, setUsers] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    const userAuth = useSelector(state => state.userAuth);
    const refresh = useSelector(state => state.refresh);

    const rows = createItemList();
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNum) => setCurrentPage(pageNum);

    const nextPage = () => setCurrentPage(currentPage + 1);

    const prevPage = () => setCurrentPage(currentPage - 1);
    
    useEffect(() => {
        getUsers();
    }, [refresh])

    const profileOnClick = (id) => {
        history.push(`/profile/${id}`);
    }

    return (
        <>
            <Container fluid className="justify-content-around p-5">
                <Card>
                    <Card.Title><h1 className="p-2"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Liste des comptes d'utilisateur</h1></Card.Title>
                    <Card.Body>
                    <Row className="mt-3">
                        <Col md={{ span: 2, offset: 10 }} className="text-right">
                            <AddUser></AddUser>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm={12}>
                            <Table striped bordered hover size="sm">
                                <thead className="text-left">
                                    <tr>
                                        <th>#</th>
                                        <th>Utilisateur</th>
                                        <th>Adresse email</th>
                                        <th>Dernière connexion</th>
                                    </tr>
                                </thead>
                                <tbody className="text-left">
                                    {currentUsers.map(user =>
                                        <tr key={user.id}>
                                            <td style={{width:"1rem"}}>{user.id}</td>
                                            <td>
                                                <Link onClick={() => profileOnClick(user.id)}>{user.lastname.toUpperCase() + ' ' + user.firstname}<br /></Link>
                                                <Role roles={user.roles}></Role>
                                                    login : <em>{user.username}</em>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.lastConnection}</td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </Table>
                            <PaginationUser indexOfLastUser={indexOfLastUser} indexOfFirstUser={indexOfFirstUser} usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                        </Col>
                    </Row>
                </Card.Body>
                </Card>
            </Container>

            {
                redirect && <Redirect to="/internal-error"></Redirect>
            }
        </>
    );
}

export default withRouter(User);