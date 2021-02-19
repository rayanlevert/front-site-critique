import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component, useEffect, useState } from "react";
import { faBan, faCheck, faCoffee, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Role from "./Role";
import "../../styles/users/index.css";
import AddUser from "./addUser";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { ProfileUser } from "./profileUser";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import InternalServerError from "../errorspages/InternalServerError";
import Pagination from '../pagination/Pagination';

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

    const [users, setUsers] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(4);

    const user = useSelector(state => state.userAuth);
    const rows = createItemList();
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNum) => setCurrentPage(pageNum);

    const nextPage = () => setCurrentPage(currentPage+1);
    
    const prevPage = () => setCurrentPage(currentPage-1);

    const state = useSelector(state => console.log("state", state));

    useEffect(() => {
        console.log("oui");
        fetch('http://localhost:8080/api/users/getAll')
        .then(response => {
            response.json().then(usersRes => {
                setUsers(usersRes);
            })
        })
    }, [setUsers])

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
                                {currentUsers.map(user =>
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
                <Pagination indexOfLastPost={indexOfLastUser} indexOfFirstPost={indexOfFirstUser} postsPerPage={usersPerPage} totalPosts={users.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />

            </Container>

            {
                redirect && <Redirect to="/internal-error"></Redirect>
            }
        </>
    );
}


export default withRouter(User);