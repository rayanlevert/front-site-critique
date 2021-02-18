import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'  
import { Button, Container, Table } from 'react-bootstrap';
import { FormattedDate } from '../components/Date/FormattedDate';

export class ListGameAdmin extends Component {  

        constructor(props){
            super(props);
            this.state = { games: []}
        }

        listReview(id){
            this.props.history.push(`/reviews/${id}`);
        }

        editGame(id){
            this.props.history.push(`/update-game/${id}`);
        }

        async componentDidMount() {    
            const response = await fetch('http://localhost:8080/api/game/');
            const games = await response.json();
            this.setState({ games });
            console.log(games);
        }   

        render() {  
            const { games } = this.state; 
            console.log(games);
             return ( 
                    <> 
                    <Container fluid>
                        <h2>Liste des articles (Game)</h2>
                        <Table striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titre</th>
                                    <th>Date de publication</th>
                                    <th>Review</th>
                                    <th>Update</th>
                                    <td>Supprimer</td>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map( game => 
                                <tr key={game.id}>
                                    <td>{game.id}</td>
                                    <td>{game.title}</td>
                                    <td><FormattedDate date={game.publishDate} /></td>
                                    <td><Button onClick={ () => this.listReview(game.id)} variant="outline-dark"><FontAwesomeIcon icon={faEye} ></FontAwesomeIcon></Button></td>
                                    <td><Button onClick={ () => this.editGame(game.id)} variant="outline-dark"><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></Button></td>
                                    <td><Button onClick={ () => this.listReview(game.id)} variant="outline-danger"><FontAwesomeIcon icon={faTrashAlt} ></FontAwesomeIcon></Button></td>
                                </tr>
                                )}
                            </tbody>
                            </Table>
                        </Container>
                    </>
                    )  
            }  
    }  
      
export default ListGameAdmin  
