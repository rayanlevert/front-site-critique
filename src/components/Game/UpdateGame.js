import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';

class UpdateGame extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onChangeGameHandle = this.onChangeGameHandle.bind(this);
    }

    componentDidMount(){
        const URL_GET_GAME = 'http://localhost:8080/api/game/' + this.props.match.params.id;
        fetch(URL_GET_GAME)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            this.setState({ 
                id: data.id,
                title: data.title,
                publishDate: data.publishDate,
                creationArticleDate: data.creationArticleDate,
                minAge: data.minAge,
                developer: data.developer,
                publisher: data.publisher,
                platform: data.platform,
                genre: data.genre,
                resume: data.resume,
                valid: data.valid
            });
        })
        .catch(error => {
            this.setState({ redirectError: true });
            this.props.history.goBack()
        });
    }
    updateGame = (e) => {
        const URL_UPDATE_GAME = 'http://localhost:8080/api/game';
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch(URL_UPDATE_GAME, requestOptions)
            .then(res => alert("Modification réussi"))
            .catch(err => alert("Erreur lors de la suppresion de la critique"))

    }

    onChangeGameHandle = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    render() {
        return (
            <>
                <Col lg="12">      
                    <Card className="m-5">
                        <Card.Body>
                            <h2>{this.state.title}</h2>
                            <Row className="mt-3">
                                <Col lg="5">
                                    <img onError={(e) => {e.target.src = '../../ressources/img/article/game/default.svg.png'; e.target.onError = null; e.target.width="300";}} src={`../../ressources/img/article/game/${this.state.id}.jpg`} width="35%" className="img-fluid" alt="image de l'affiche du jeux video de l'article" title="image de l'affiche du jeux video de l'article"></img>
                                </Col>
                                <Col lg="7">
                                    <ListGroup>
                                        <ListGroup.Item><b>Min age : </b>{this.state.minAge}</ListGroup.Item>
                                        <ListGroup.Item><b>Date de sortie : </b><FormattedDate date={this.state.publishDate} /></ListGroup.Item>
                                        <ListGroup.Item><b>Genre : </b>{this.state.genre}</ListGroup.Item>
                                        <ListGroup.Item><b>Developpeur : </b> {this.state.developer}</ListGroup.Item>
                                        <ListGroup.Item><b>Producteur : </b>{this.state.publisher}</ListGroup.Item>
                                        <ListGroup.Item><b>Plateforme : </b>{this.state.platform}</ListGroup.Item>
                                        <ListGroup.Item><h3 className="list-group-item-heading">Résume</h3>{this.state.resume}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col  md={{ span: 2, offset: 10 }} className="text-right">
                                <small>Créer le <FormattedDate date={this.state.creationArticleDate}/></small>
                                </Col>
                            </Row>                                      
                            <Form className="mt-5 text-left">
                                <Row>
                                    <Col lg="6">
                                        <Form.Group controlId="title">  
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control  type="text" placeholder="Entrez le titre de l'article" value={this.state.title} onChange={this.onChangeGameHandle} required/>
                                        </Form.Group>
                                        <Form.Group controlId="minAge">
                                            <Form.Label>Minimum age</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le minimum d'âge " value={this.state.minAge} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                        <Form.Group controlId="genre">
                                            <Form.Label>Genre</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le genre de l'article" value={this.state.genre} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                        <Form.Group controlId="developer">
                                            <Form.Label>Developpeur</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le développeur ou les déveoppeurs (entre/)" value={this.state.developer} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                        <Form.Group controlId="publisher">
                                            <Form.Label>Producteur</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le producteur" value={this.state.publisher} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                        <Form.Group controlId="platform">
                                            <Form.Label>Plateforme</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez la plateforme" value={this.state.platform} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <Form.Group controlId="publishDate">
                                            <Form.Label>Date de sortie</Form.Label>
                                            <Form.Control valid="true" contentEditable="true" type="date" as="input" name="publishDate" value={this.state.publishDate} onChange={this.onChangeGameHandle} />
                                        </Form.Group>
                                        <Form.Group controlId="resume">
                                            <Form.Label>Résume</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={this.state.resume} onChange={this.onChangeGameHandle}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit" onClick={this.updateGame}>Sauvegarde</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        );
    }
}

export default UpdateGame;
/**
 * 
 */