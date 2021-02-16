import React, { Component } from 'react';
import { Card, ListGroup,Button, Row, Col } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';
import Review from '../review/Review';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { withRouter,useParams  } from 'react-router-dom';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { games: [] };
        this.createdReview = this.createdReview.bind(this);
    }

    async componentDidMount(){
        console.log('GAME');
        const response = await fetch('http://localhost:8080/api/game/' + this.props.match.params.id);
        const games = await response.json();
        this.setState({ games });
        console.log(games); 
    }

    createdReview(){
        this.props.history.push({
            pathname : '/create-review',
            state :{
            articleId : this.state.games.id,
            articleTitle : this.state.games.title,
            genre: "game"
            }});
    }

    render() {
        return (
            <> 
            <Row>
                <Col>      
                <Card className="m-5">
                    <Card.Body>
                        <h2>{this.state.games.title}</h2>
                        <div className="row">
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
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Button onClick= {this.createdReview} className="float-right" variant="outline-dark"><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon> Rédiger une critique</Button>
                            </div>
                        </div>
                        
                        <hr />
                        <Review idArticle={this.state.games.id}></Review>
                    </Card.Body>
                </Card>
                </Col>
                </Row>
            </>
        );
    }
}

export default withRouter(Game);
