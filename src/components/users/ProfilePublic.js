import React, { Component } from 'react';
import { Badge, Card, Col, Container, Image, Jumbotron, ListGroup, Row,Button } from 'react-bootstrap';
import moment from 'moment';
import { withRouter,useParams, Redirect  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class ProfilePublic extends Component {

    constructor(props) {
        super(props);
        this.state = { user:[] };
    }

    editGame(id){
        this.props.history.push({pathname : `/profile/${id}`});
    }

    componentDidMount(){
        const URL_GET_GAME = 'http://localhost:8080/api/users/getByUsername?username=' + this.props.match.params.username;
        fetch(URL_GET_GAME)
        .then(body => body.json().then(response => {
            if (response.status === "OK") {
                this.setState({user: response.subObject});
            } else {
                this.props.history.goBack()
            }
        }))
        .catch(error => console.log(error))}

    render() {
        console.log(this.state)
        let currentTimestamp = Date.now();
        var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' };
        let date = new Date(this.state.user.registrationDate).toLocaleDateString([],options);
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
                            <p>{this.state.user.catchPhrase}</p>
                        </blockquote>
                </Jumbotron>
                    <Card.Body>
                        <Row>
                            <Col md={{ span: 2, offset: 10 }}>
                                {roles.map(role => {
                                   switch(role.name){
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
                                        <ListGroup.Item><b>Username : </b> {this.state.user.username}</ListGroup.Item>
                                        <ListGroup.Item><b>Age : </b> {this.state.user.age} ans</ListGroup.Item>
                                        <ListGroup.Item><b>Membre depuis </b>{diffDuration.days()} Jours {diffDuration.hours()} Heures {diffDuration.minutes()} Minutes</ListGroup.Item>
                                        <ListGroup.Item><h3 className="list-group-item-heading">Description</h3>{this.state.user.description}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col lg="12">
                                <Button onClick={ () => this.editGame(this.state.user.id)} variant="outline-dark"><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon> Editer</Button>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
            </Container>
            </>
        );
    }
}

export default withRouter(ProfilePublic);
