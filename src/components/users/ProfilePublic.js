import React, { Component } from 'react';
import { Badge, Card, Col, Container, Image, Jumbotron, ListGroup, Row, Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/fr'
import { withRouter, useParams, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FormattedDateWithTime } from '../Date/FormattedDate';

class ProfilePublic extends Component {

    constructor(props) {
        super(props);
        this.state = { user: [], reviews: [], userAuth: [] };
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.deleteReview = this.deleteReview.bind(this);
        this.getLinkReview = this.getLinkReview.bind(this);
    }

    editGame(id) {
        this.props.history.push({ pathname: `/profile/${id}` });
    }

    deleteReview(id){
        console.log("id", id);
        const URL_DELETE_REVIEW = "http://localhost:8080/api/reviews/review/" + id;
       fetch(URL_DELETE_REVIEW, { method: 'DELETE' })
        .then(() => this.setState({ reviews: this.state.reviews.filter(review => review.idReview !== id) }))
        .catch(err => alert("Erreur lors de la suppresion de la critique"))
    }

    getLinkReview(review) {
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

    componentDidMount() {
        const URL_GET_GAME = 'http://localhost:8080/api/users/getByUsername?username=' + this.props.match.params.username;
        fetch(URL_GET_GAME)
            .then(body => body.json().then(response => {
                if (response.status === "OK") {
                    this.setState({ user: response.subObject });
                    console.log("oui", this.state.user);
                } else {
                    this.props.history.goBack()
                }
            }))
            .catch(error => console.log(error))

        const userAuth = JSON.parse(localStorage.getItem('user'));
        this.setState({ userAuth });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.user !== this.state.user) {
            fetch(`http://localhost:8080/api/reviews/user/${this.state.user.id}`)
            .then(response => {
                response.json().then(reviews => {
                    console.log("ouioui",reviews);
                    this.setState({ reviews: reviews })
                })
            })
        }
    }

    render() {
        moment.locale();
        console.log(this.state)
        let currentTimestamp = Date.now();
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let date = new Date(this.state.user.registrationDate).toLocaleDateString([], options);
        let dateCurrent = new Date(this.state.user.registrationDate).getTime();
        const startDate = moment(dateCurrent);
        const timeEnd = moment(currentTimestamp);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);
        let roles = this.state.user.roles || [];
        return (
            <>
                <Container>
                    <Card className="mt-3">
                        <Jumbotron fluid>
                            <Image roundedCircle width="15%" src={`../../ressources/img/article/game/anonyme.png`} className="img-fluid" alt="image de profil de utilisateur" title="image de profil de l'utilisateur" />
                            <blockquote className="mt-2">
                                <p>{this.state.user.catchPhrase !== '' ? this.state.user.catchPhrase : 'Aucune phrase d\'accroche'}</p>
                            </blockquote>
                        </Jumbotron>
                        <Card.Body>
                            <Row>
                                <Col md={{ span: 2, offset: 10 }}>
                                    {roles.map(role => {
                                        switch (role.name) {
                                            case "ROLE_ADMIN":
                                                return <Badge variant="danger">Administrateur</Badge>
                                            case "ROLE_USER":
                                                return <Badge variant="primary">Utilisateur</Badge>
                                            default:

                                                break;
                                        }
                                    })}

                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col lg="12">
                                    <ListGroup>
                                        <ListGroup.Item><b>Pseudonyme : </b> {this.state.user.username}</ListGroup.Item>
                                        <ListGroup.Item><b>Âge : </b> {this.state.user.age} ans</ListGroup.Item>
                                        <ListGroup.Item><b>Membre depuis </b> le {this.state.user.registrationDate !== undefined ? moment(this.state.user.registrationDate).format('LL') : ''}</ListGroup.Item>
                                        <ListGroup.Item><b>Nombre de critique : </b> {this.state.reviews.length}</ListGroup.Item>
                                        <ListGroup.Item><h3 className="list-group-item-heading">Description</h3>{this.state.user.description !== '' ?  this.state.user.description : 'Aucune description'}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col lg="12">
                                    <Button onClick={() => this.editGame(this.state.user.id)} variant="outline-dark"><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon> Editer</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <h5 style={{ textAlign: "left" }}><i>Ses dernières critiques : </i></h5>

                            {(this.state.reviews !== undefined && this.state.reviews.length !== 0 ? (
                                this.state.reviews.map(review => (
                                    <div key={review.idReview} className="col-12 mt-4">
                                        { this.state.userAuth !== null ? (review.user.id === this.state.userAuth.userId ? (
                                            <Dropdown className="float-right">
                                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                                    <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item><Link to={`/update-review/${review.idReview}`}>Modifier</Link></Dropdown.Item>
                                                    <Dropdown.Item onClick={() => this.deleteReview(review.idReview)}>Supprimer</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : ("")) : ("")}
                                        <div className="media">
                                            <div className="media-body">
                                                <h4><Link to={this.getLinkReview(review)}>{review.article.title}</Link></h4>
                                                <h5>{review.titleReview}</h5>
                                                <p className="text-left">{review.contentReview}</p>
                                                <small className="float-left">Note de sa critique : {review.noteReview}/10</small><small className="float-right">écrite le <FormattedDateWithTime date={review.publishDate} /></small>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )
                            ) : (
                                    <p>Aucune critique</p>
                                ))}
                        </Card.Footer>
                    </Card>
                </Container>
            </>
        );
    }
}

export default withRouter(ProfilePublic);

/**
 * TODO
 *  - Faire un systéme de fidélité
 *  {diffDuration.years()} année {diffDuration.months()} mois {diffDuration.days()} jour{diffDuration.days() > 1 ? 's' : ''}
 */