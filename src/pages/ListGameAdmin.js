import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'  
import { Button, Card, Container, Table } from 'react-bootstrap';
import { FormattedDate } from '../components/Date/FormattedDate';
import Pagination from '../components/pagination/Pagination';

export class ListGameAdmin extends Component {  

        constructor(props){
            super(props);
            this.state = { 
                currentPage: 1,
                postsPerPage: 10,
                games: []
            }
        }

        createGame(){
            this.props.history.push('/create-game');
        }

        listReview(id){
            this.props.history.push(`/reviews/${id}`);
        }

        editGame(id,title){
            this.props.history.push({
                pathname : `/update-game/${id}`,
                state :{
                    articleTitle : title,
                }});
        }

        deleteGame(id){
            const URL_DELETE_GAME = "http://localhost:8080/api/game/" + id;
           fetch(URL_DELETE_GAME, { method: 'DELETE' })
            .then(
                () => {
                this.setState({ games: this.state.games.filter(game => game.id !== id) });
                })
            .catch(err => alert("Erreur lors de la suppresion de la article"))
        }

        async componentDidMount() {    
            const response = await fetch('http://localhost:8080/api/game/');
            const games = await response.json();
            this.setState({ games });
        }   

        render() {  
            const { currentPage, postsPerPage, games } = this.state;
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);
        
            const paginate = pageNum => this.setState({ currentPage: pageNum });
        
            const nextPage = () => this.setState({ currentPage: currentPage + 1 });
        
            const prevPage = () => this.setState({ currentPage: currentPage - 1 });
             return ( 
                    <> 
                    <Container fluid>
                        <Card className="col-12 mt-4">
                        <h2>Liste des articles (Game)</h2>
                        <Button variant="outline-success m-2" className="float-right" onClick={ () => this.createGame()}><FontAwesomeIcon icon={faEdit}/>Rédiger une fiche (game)</Button>
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titre</th>
                                        <th>Date de création</th>
                                        <th>Review</th>
                                        <th>Update</th>
                                        <td>Supprimer</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPosts.map( game => 
                                    <tr key={game.id}>
                                        <td>{game.id}</td>
                                        <td>{game.title}</td>
                                        <td><FormattedDate date={game.creationArticleDate} /></td>
                                        <td><Button onClick={ () => this.listReview(game.id,game.title)} variant="outline-dark"><FontAwesomeIcon icon={faEye} ></FontAwesomeIcon></Button></td>
                                        <td><Button onClick={ () => this.editGame(game.id)} variant="outline-dark"><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></Button></td>
                                        <td><Button onClick={ () => { if (window.confirm('Voulez-vous supprimer cette article ?')) this.deleteGame(game.id) }} variant="outline-danger"><FontAwesomeIcon icon={faTrashAlt} ></FontAwesomeIcon></Button></td>
                                    </tr>
                                    )}
                                </tbody>
                                </Table>
                                <Pagination indexOfLastPost={indexOfLastPost} indexOfFirstPost={indexOfFirstPost} postsPerPage={postsPerPage} totalPosts={games.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                            </Card>
                        </Container>
                    </>
                    )  
            }  
    }  
      
export default ListGameAdmin  
