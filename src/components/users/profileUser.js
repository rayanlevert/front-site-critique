import { faBan, faEllipsisH, faExclamationTriangle, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { remove, update } from "../../redux/actions/actionCreatorUserAuth";
import "../../web/css/users/index.css";
import { FormattedDateWithTime } from "../Date/FormattedDate";
import Pagination from "../pagination/Pagination";
import roleToString from "../Role/roleToString";
import Role from "./Role";

export function ProfileUser({ update_user, remove_user }) {
    let ROLES = ["ROLE_USER", "ROLE_ADMIN"];

    const { id } = useParams();
    const [user, setUser] = useState({});
    const userAuth = useSelector(state => state.userAuth);
    const [roles, setRoles] = useState(["ROLE_USER", "ROLE_ADMIN"]);
    const [reviews, setReviews] = useState([]);

    const [openPassword, isOpenPassword] = useState(false);
    const [password, setPassword] = useState({ rawPassword: '', encodedPassword: '' });

    const [openDelete, isOpenDelete] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    const [verif, setVerif] = useState(false);

    const [variant, setVariant] = useState("danger");
    const [redirect, setRedirect] = useState(false);

    const handleOpenPassword = () => {
        if (!verif) isOpenPassword(true);
    }
    const handleClosePassword = () => isOpenPassword(false);

    const handleCloseDelete = () => isOpenDelete(false);
    const handleOpenDelete = () => isOpenDelete(true);

    useEffect(() => {

        if (userAuth.userId !== user.id || !userAuth.roles.includes("ROLE_ADMIN")) {
            <Redirect to="/"></Redirect>
        }

        if (!userAuth.roles.some(role => role.name === "ROLE_ADMIN")) {
            let array = ROLES.slice(0, 1);
            setRoles(array);
        }

        fetch(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                response.json().then(user => {
                    setUser(user);
                    setPassword({ ...password, encodedPassword: user.password })
                })
            });

        fetch(`http://localhost:8080/api/reviews/user/${id}`)
            .then(response => {
                response.json().then(reviews => {
                    setReviews(reviews);
                })
            })
    }, []);

    const onChange = (e) => {
        let id = e.target.id;
        setUser({ ...user, [e.target.id]: e.target.value });

        if (id === "passwordVerif") {
            setUser({ ...user, password: e.target.value })
        }
    }

    const checkRole = (role) => {
        if (user.roles !== undefined && user.roles.some(e => e.name === role)) {
            return true;
        } return false;
    }

    const onChangeRoles = (e) => {
        let object;
        const array = user.roles;
        object = { "name": e.target.id }
        if (e.target.checked) {
            array.push(object);
        } else {
            const index = array.findIndex((role) => role.name === e.target.id);
            array.splice(index, 1);
        }
        setUser({ ...user, roles: array });
    }

    const displayAlert = (variant, message, id) => {
        setVariant(variant);

        switch (id) {
            case "alertDelete":
                setVisibleDelete(true);
            case "alertSave":
                setVisibleSave(true);
        }

        let alert = document.getElementById(id);
        alert.textContent = message;

        setTimeout(() => {
            if (id === "alertDelete") {
                setRedirect(true);
            } else setVisibleSave(false);
        }, 1500);


    }

    const handleSubmitPasswordVerif = (e) => {
        fetch("http://localhost:8080/api/users/checkPassword", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(password)
        }).then(response => {
            if (response.status === 200) {
                setVerif(true);
                setVisiblePassword(false);
                setUser({ ...user, password: password.rawPassword })
                handleClosePassword();
            } else setVisiblePassword(true);
        })
    }

    const getLinkReview = (review) => {
        console.log(review);
        let url = '';

        switch (review.article.discriminator) {
            case 'game':
                url = "/article/game/" + review.article.id;
                break;

            case 'movie':
                url = "/movie/view/" + review.article.id;
                break;
        }
        console.log(url);
        return url;
    }

    const getLinkUpdate = (review) => {
        let url = '';

        switch (review.article.discriminator) {
            case 'game':
                url = "/a"
        }
    }

    const onChangePasswordVerif = (e) => {
        setPassword({ ...password, rawPassword: e.target.value });
    }

    const handleSubmitSave = () => {
        fetch("http://localhost:8080/api/users/update", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => {
            response.json().then(response => {
                if (response.status === "OK") {
                    displayAlert("success", response.message, "alertSave");
                    update_user(user);
                } else displayAlert("danger", response.message, "alertSave");
            })
        });
    }

    const handleSubmitDelete = () => {
        fetch(`http://localhost:8080/api/users/delete/${id}`, {
            method: 'DELETE'
        }).then(response => response.json().then(response => {
            if (response.status === "OK") {
                displayAlert("success", response.message, "alertDelete");
            } else displayAlert("info", response.message, "alertDelete");
        }))
    }

    const deleteReview = (id) => {
        console.log(id);
        const URL_DELETE_REVIEW = "http://localhost:8080/api/reviews/review/" + id;
        fetch(URL_DELETE_REVIEW, { method: 'DELETE' })
            .then(() => setReviews(reviews.filter(review => review.idReview !== id) ))
            .catch(err => alert("Erreur lors de la suppresion de la critique"))
    }


    return (
        <>
            <h1>Bienvenue sur votre page de profil {user.firstname} !</h1>
            <small>Vous pouvez ici modifier chaque champ de votre choix.</small>
            <Alert variant={variant} id="alertSave" show={visibleSave}></Alert>

            <Container fluid className="containerProfilUser justify-content-around">
                <Row style={{ marginTop: "3rem" }}>
                    <Col sm={4}>
                        <b>GENERAL</b>
                        <hr class="solid"></hr>
                        <Form className="formProfile">
                            <Form.Group controlId="lastname">
                                <Form.Label>Nom de famille</Form.Label>
                                <Form.Control type="text" value={user.lastname} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group controlId="firstname">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" value={user.firstname} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group controlId="username">
                                <Form.Label>Pseudonyme</Form.Label>
                                <Form.Control type="text" value={user.username} onChange={onChange} required />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col sm={4}>
                        <b>DETAILS DU COMPTE</b>
                        <hr class="solid"></hr>

                        <Form className="formProfile">
                            <Form.Group controlId="email">
                                <Form.Label>Adresse email</Form.Label>
                                <Form.Control type="email" value={user.email} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group controlId="passwordVerif">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" value={user.password} onClick={handleOpenPassword} onChange={onChange} required />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col sm={2}>
                        <b>ROLES</b>
                        <hr class="solid"></hr>
                        <Form.Group controlId="roles">
                            {
                                roles.map((role) => <Form.Check onChange={onChangeRoles} custom type="checkbox" id={role} label={roleToString(role)} checked={checkRole(role)} required hidden />)
                            }
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Button variant="primary" size="sm" onClick={handleSubmitSave}><FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Modifier</Button> &nbsp;
                        <Button variant="danger" size="sm" onClick={handleOpenDelete}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon> Effacer le profil</Button>
                    </Col>
                </Row>

                <Row style={{ paddingTop: "2rem" }}>
                    <Col sm={10}>
                        <b>VOS CRITIQUES</b>
                        <hr class="solid"></hr>
                        {(reviews.length !== 0 ? (
                            reviews.map(review => (
                                <div key={review.idReview} className="col-12 mt-4">
                                    { userAuth !== null ? (review.user.id === userAuth.userId ? (
                                        <Dropdown className="float-right">
                                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                                <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item><Link to={`/update-review/${review.idReview}`}>Modifier</Link></Dropdown.Item>
                                                <Dropdown.Item onClick={() => deleteReview(review.idReview)}>Supprimer</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : ("")) : ("")}
                                    <div className="media">
                                        <div className="media-body">
                                            <h4><Link to={getLinkReview(review)}>{review.article.title}</Link></h4>
                                            <h5>{review.titleReview}</h5>
                                            <p className="text-left">{review.contentReview}</p>
                                            <small className="float-left">Note de votre critique : {review.noteReview}</small><small className="float-right">écrite le <FormattedDateWithTime date={review.publishDate} /></small>
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        ) : (
                                <p>Aucune critique est disponible pour cette page.</p>
                            ))}
                    </Col>
                </Row>
            </Container>

            <Modal show={openPassword} onHide={handleClosePassword} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer votre ancien mot de passe avant de le modifier</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert id="alertDelete" variant="danger" show={visiblePassword}>Le mot de passe est incorrect.</Alert>
                    <Form>
                        <Form.Group controlId="passwordVerif">
                            <Form.Label>Ancien mot de passe</Form.Label>
                            <Form.Control type="password" required onChange={onChangePasswordVerif} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePassword}>Fermer</Button>
                    <Button variant="primary" onClick={handleSubmitPasswordVerif}>Appliquer</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={openDelete} onHide={handleCloseDelete} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> Etes vous sur de vouloir supprimer ce compte?<br />
                            <small>Attention, cette action est irréversible.</small>
                        </p>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert variant={variant} id="alertDelete" show={visibleDelete}></Alert>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>Fermer</Button>
                    <Button variant="danger" onClick={handleSubmitDelete}>Supprimer</Button>
                </Modal.Footer>
            </Modal>





            { redirect && <Redirect to="/"></Redirect>}
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_user: (userUpdated) => dispatch(update(userUpdated)),
        remove_user: (userRemoved) => dispatch(remove(userRemoved))
    }
}

export default connect(null, mapDispatchToProps)(ProfileUser)