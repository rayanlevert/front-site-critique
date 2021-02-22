import { faBan, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component, useEffect, useState } from "react";
import { faBan, faCheck, faCoffee, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Role from "./Role";
import "../../web/css/users/index.css";
import AddUser from "./addUser";
import Role from "./Role";

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
                                <PaginationUser indexOfLastUser={indexOfLastUser} indexOfFirstUser={indexOfFirstUser} usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                            </tbody>
                        </Table>
                    </Col>
                </Row>



            </Container>

            {
                redirect && <Redirect to="/internal-error"></Redirect>
            }
        </>
    );
}

export default withRouter(User);