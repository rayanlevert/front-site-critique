import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Media,Dropdown } from 'react-bootstrap';
import { FormattedDateWithTime } from '../Date/FormattedDate';
import { withRouter } from "react-router-dom";
 
class Review extends Component {
    
    constructor(props) {
        super(props);
        this.state = {reviews: []};
        this.deleteReview = this.deleteReview.bind(this);
        this.editReview = this.editReview.bind(this);
        console.log(this.props);
    }

    editReview(id){
        this.props.history.push(`/update-review/${id}`);
    }

    deleteReview(id){
        const URL_DELETE_REVIEW = "http://localhost:8080/api/reviews/review/" + id;
       fetch(URL_DELETE_REVIEW, { method: 'DELETE' })
        .then(() => this.setState({ reviews: this.state.reviews.filter(review => review.idReview !== id) }))
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
    }

    render() {
        return (
            <>
                 {(this.state.reviews.length !== 0 ? (
                
                    this.state.reviews.map( review => (
                        <div key={review.idReview} className="col-12 mt-4">
                            {review.userId === 3 && (
                                <Dropdown className="float-right">
                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                  <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                                </Dropdown.Toggle>
                              
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={ () => this.editReview(review.idReview)}>Modifier</Dropdown.Item>
                                  <Dropdown.Item onClick={ () => this.deleteReview(review.idReview)}>Supprimer</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            )}

                            <div  className="media">
                                <div className="media-body">
                                        <h5>{ review.titleReview }</h5>
                                    <p className="text-left">{ review.contentReview }</p>
                                    <small className="float-left">Note de la critique : { review.noteReview }</small><small className="float-right">Créer par { review.userUsername } le <FormattedDateWithTime date={ review.publishDate } /></small>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                    <p>Aucune critique est disponnible pour cette page.</p>
                    ) )}
            </>
        );
    } 
}
export default withRouter(Review);
/**
 * TODO
 * 
 * - Lors du clique sur utilisateur allait sur son profil
 * - Système de note (étoiles)
 * - Formattage de la date
 */