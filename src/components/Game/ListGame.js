import React, { Component } from 'react';
import { Card, ListGroup,Button, Col, Row, Image, Container, CardDeck } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';
import Review from '../review/Review';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { withRouter,useParams  } from 'react-router-dom';

const styles = {
    cardImage: {
        width: '100%',
        height: '15vw',
        objectFit: 'cover'
    }
  }
  
class ListGame extends Component {
    constructor(props) {
        super(props);
        this.state = { games: [] };
        this._createItemList.bind(this);
    }

    async componentDidMount(){
        console.log('GAME');
        const response = await fetch('http://localhost:8080/api/game/');
        const games = await response.json();
        this.setState({ games });
        console.log(games); 
    }
    truncate(string) {
        return string.length > 150 ? string.substring(0, 150) + "..." : string;
    }

    viewArticle(id){
        this.props.history.push(`game/${id}`);
    }

    _createItemList() {
        let rows = {}
        let counter = 1
        this.state.games.forEach((item, idx) => {
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
    render() {
        let rows = this._createItemList()
    console.log(rows)
        return (
            <> 
                <Container fluid>         
                    {Object.keys(rows).map(row => {
                                return (
                                <div className="row items__row" key={row}>
                                    {rows[row].map(game => {
                                    return (
                                        <Col xs="12" sm="12" lg="4" className="d-flex">
                                            <Card key={game.id} className="mt-2 flex-fill">       
                                                <Image className="card-img-top img-fluid" style={styles.cardImage} src={`../ressources/img/article/game/${game.id}.jpg`}  fluid />
                                                <Card.Body>
                                                <Card.Title>{game.title}</Card.Title>
                                                    <Card.Text style={styles.cardText}>
                                                    {this.truncate(game.resume)}    
                                                    </Card.Text>
                                                    <Button onClick={ () => this.viewArticle(game.id)} variant="primary">Aller voir l'article </Button>
                                                </Card.Body>
                                            </Card> 
                                        </Col>
                                    )
                                    })}
                                </div>
                                )
                            })}
                            </Container>  
            </>
        );
    }
}

export default withRouter(ListGame);
