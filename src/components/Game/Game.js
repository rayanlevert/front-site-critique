import React, { Component } from 'react';
import { Card, ListGroup,Button, Row, Col } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';
import Review from '../review/Review';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { withRouter,useParams, Redirect  } from 'react-router-dom';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { games: [], redirectError: false, user:[] };
        this.createdReview = this.createdReview.bind(this);
        
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
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({user});
    }

    createdReview(){
        this.props.history.push({
            pathname : '/create-review',
            state :{
            articleId : this.state.games.id,
            articleTitle : this.state.games.title,
            genre: "game",
            userId: this.state.user.userId
            }});
    }

    render() {
        return (
            <> 
                <Col>      
                <Card className="col-12 mt-4">
                    <a className="ml-4 mt-3 text-left" href="/article/game"><FontAwesomeIcon icon={faArrowLeft} /> Retour</a>
                    <Card.Body>
                        <h2>{this.state.games.title}</h2>
                        <Row className="mt-3">
                                <Col lg="5">
                                    <img src={`../../ressources/img/article/game/${this.state.games.id}.jpg`} width="35%" className="img-fluid" alt="image de l'affiche du jeux video de l'article" title="image de l'affiche du jeux video de l'article"></img>
                                </Col>
                                <Col lg="7">
                                    <ListGroup>
                                        <ListGroup.Item><b>Min age : </b>{this.state.games.minAge}</ListGroup.Item>
                                        <ListGroup.Item><b>Genre : </b>{this.state.games.genre}</ListGroup.Item>
                                        <ListGroup.Item><b>Date de sortie : </b><FormattedDate date={this.state.games.publishDate}/></ListGroup.Item>
                                        <ListGroup.Item><b>Developpeur : </b> {this.state.games.developer}</ListGroup.Item>
                                        <ListGroup.Item><b>Producteur : </b>{this.state.games.publisher}</ListGroup.Item>
                                        <ListGroup.Item><b>Plateforme : </b>{this.state.games.platform}</ListGroup.Item>
                                        <ListGroup.Item><h3 className="list-group-item-heading">Résume</h3>{this.state.games.resume}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col  md={{ span: 2, offset: 10 }} className="text-right">
                                <small>Pubier le <FormattedDate date={this.state.games.publishDate}/></small>
                                </Col>
                            </Row>  
                        <div className="row">
                            <div className="col-12 mt-3">
                                {this.state.user !== null && (
                                <Button onClick= {this.createdReview} className="float-right" variant="outline-dark"><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon> Rédiger une critique</Button>
                                )}
                            </div>
                        </div>
                        
                        <hr />
                        <Review idArticle={this.state.games.id}></Review>
                    </Card.Body>
                </Card>
                </Col>
            </>
        );
    }
}

export default withRouter(Game);
/**
 *  <div className="row">
                            <div className="col-5">
                                <img src={`../../ressources/img/article/game/${this.state.games.id}.jpg`} width="35%" className="img-fluid" alt="image de l'affiche du jeux video de l'article" title="image de l'affiche du jeux video de l'article"></img>
                            </div>
                            <div className="col-6">
                                <ListGroup key={this.state.games.id}>
                                    <ListGroup.Item>Date de publication : <FormattedDate date={this.state.games.publishDate}/></ListGroup.Item>
                                    <ListGroup.Item>Date de création de l'article : <FormattedDate date={this.state.games.creationArticleDate} /></ListGroup.Item>
                                    <ListGroup.Item>Min age : {this.state.games.minAge}</ListGroup.Item>
                                    <ListGroup.Item>Genre : {this.state.games.genre}</ListGroup.Item>
                                    <ListGroup.Item>Developpeur : {this.state.games.developer}</ListGroup.Item>
                                    <ListGroup.Item>Producteur : {this.state.games.publisher}</ListGroup.Item>
                                    <ListGroup.Item>Plateforme : {this.state.games.platform}</ListGroup.Item>
                                </ListGroup>
                            </div>
                            
                        </div>
 */