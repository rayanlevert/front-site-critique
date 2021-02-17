import React, { Component } from 'react';
import { Card, ListGroup,Button, Col, Row, Image, Container, CardDeck } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';
import Review from '../review/Review';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { withRouter,useParams  } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

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
        this.state = {
             games: [],
             loading: false,
             currentPage: 1,
             postsPerPage: 3
             };
        this._createItemList.bind(this);
    }

    async componentDidMount(){
        this.setState({ loading: true });
        const response = await fetch('http://localhost:8080/api/game/');
        const games = await response.json();
        this.setState({ games });
        this.setState({ loading: false });
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
        const rows = this._createItemList()
        const { currentPage, postsPerPage, games, loading } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);
    
        const paginate = pageNum => this.setState({ currentPage: pageNum });
    
        const nextPage = () => this.setState({ currentPage: currentPage + 1 });
    
        const prevPage = () => this.setState({ currentPage: currentPage - 1 });
        return (
            <> 
                <Container fluid>         
                    <div className="row items__row">
                        {currentPosts.map(game => {
                            return (
                                <Col key={game.id} xs="12" sm="12" lg="4" className="d-flex">
                                    <Card  className="mt-2 flex-fill">       
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
                    <Pagination indexOfLastPost={indexOfLastPost} indexOfFirstPost={indexOfFirstPost} postsPerPage={postsPerPage} totalPosts={games.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                </Container>  
            </>
        );
    }
}

export default withRouter(ListGame);
