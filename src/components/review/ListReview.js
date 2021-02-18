import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Media,Dropdown, Container, Button, Table } from 'react-bootstrap';
import { FormattedDate, FormattedDateWithTime } from '../Date/FormattedDate';
import { withRouter } from "react-router-dom";
 
class ListReview extends Component {
    
    constructor(props) {
        super(props);
        this.state = {reviews: []};
        this.deleteReview = this.deleteReview.bind(this);
    }

    deleteReview(id){
        const URL_DELETE_REVIEW = "http://localhost:8080/api/reviews/review/" + id;
       fetch(URL_DELETE_REVIEW, { method: 'DELETE' })
        .then(
            () => {
            this.setState({ reviews: this.state.reviews.filter(review => review.idReview !== id) });
            })
        .catch(err => alert("Erreur lors de la suppresion de la critique"))
    }

    async componentDidMount(){
        console.log("Appel de la rêquete review article by id");
        const idArticle = this.props.match.params.id;
        console.log(idArticle);
        if(this.state.reviews.length === 0){
            const REVIEW_API_ID_BY_ARTICLE ="http://localhost:8080/api/reviews/article/" + idArticle;
            const response = await fetch(REVIEW_API_ID_BY_ARTICLE);
            const reviews = await response.json();
            this.setState({ reviews }); 
            console.log(reviews);
        } else{
            this.setState(this.state.reviews.length)
        }
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Container fluid>
                    <h2>Liste des critque</h2>
                    <Table responsive striped bordered hover variant="secondary" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Contenu</th>
                                <th>Date de publication</th>
                                <th>Auteur</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reviews.map( review => (
                                <tr key={review.idReview}>
                                    <td>{review.idReview}</td>
                                    <td>{review.titleReview}</td>
                                    <td>{review.contentReview}</td>
                                    <td><FormattedDate date={review.publishDate}  /></td>
                                    <td>{review.userUsername}<br /><small>(id :{review.userId})</small></td>
                                    <td><Button variant="danger" onClick={() => { if (window.confirm('Voulez-vous supprimer cette critique ?')) this.deleteReview(review.idReview) } }  variant="outline-danger"><FontAwesomeIcon icon={faTrashAlt} ></FontAwesomeIcon></Button></td>
                                </tr>
                                ))}
                        </tbody>
                    </Table>
                </Container>
            </>
        );
    } 
}
export default withRouter(ListReview);
/**
 * TODO
 * 
 * - Lors du clique sur utilisateur allait sur son profil
 *                                 
 */