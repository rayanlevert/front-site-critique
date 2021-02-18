import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';

class UpdateGame extends Component {
    constructor(props){
        super(props);
        this.state = { games: []}
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
            this.setState({ games: data })
        })
        .catch(error => {
            this.setState({ redirectError: true });
            this.props.history.goBack()
        });
    }

    render() {
        return (
            <>
                {console.log(this.state.games)}
                <Col lg="12">      
                    <Card className="m-5">
                        <Card.Body>
                            <h2>{this.state.games.title}</h2>
                            <Row>
                                <Col lg="5">
                                    <img src={`../../ressources/img/article/game/${this.state.games.id}.jpg`} width="35%" className="img-fluid" alt="image de l'affiche du jeux video de l'article" title="image de l'affiche du jeux video de l'article"></img>
                                </Col>
                                <Col lg="6">
                                    <ListGroup key={this.state.games.id}>
                                        <ListGroup.Item>Date de publication : <FormattedDate date={this.state.games.publishDate}/></ListGroup.Item>
                                        <ListGroup.Item>Date de création de l'article : <FormattedDate date={this.state.games.creationArticleDate} /></ListGroup.Item>
                                        <ListGroup.Item>Min age : {this.state.games.minAge}</ListGroup.Item>
                                        <ListGroup.Item>Genre : {this.state.games.genre}</ListGroup.Item>
                                        <ListGroup.Item>Developpeur : {this.state.games.developer}</ListGroup.Item>
                                        <ListGroup.Item>Producteur : {this.state.games.publisher}</ListGroup.Item>
                                        <ListGroup.Item>Plateforme : {this.state.games.platform}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Form className="text-left">
                                <Row>
                                    <Col lg="6">
                                        <Form.Group controlId="lastname">
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control  type="text" placeholder="Entrez le titre de l'article"  required />
                                        </Form.Group>
                                        <Form.Group controlId="lastname">
                                            <Form.Label>Minimum age</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le minimum d'âge "  required />
                                        </Form.Group>
                                        <Form.Group controlId="lastname">
                                            <Form.Label>Genre</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le genre de l'article"  required />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                        <Form.Group controlId="lastname">
                                                <Form.Label>Developpeur</Form.Label>
                                                <Form.Control type="text" placeholder="Entrez le développeur ou les déveoppeurs (entre/)"  required />
                                            </Form.Group>
                                            <Form.Group controlId="lastname">
                                                <Form.Label>Producteur</Form.Label>
                                                <Form.Control type="text" placeholder="Entrez le producteur" required />
                                            </Form.Group>
                                            <Form.Group controlId="lastname">
                                                <Form.Label>Plateforme</Form.Label>
                                                <Form.Control type="text" placeholder="Entrez la plateforme"   required />
                                            </Form.Group>
                                        </Col>
                                    <Button variant="primary" type="submit">Submit</Button>
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
