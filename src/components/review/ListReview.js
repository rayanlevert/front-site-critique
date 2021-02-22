import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Media,Dropdown, Container, Button, Table, Card } from 'react-bootstrap';
import { FormattedDate, FormattedDateWithTime } from '../Date/FormattedDate';
import { withRouter } from "react-router-dom";
import Pagination from '../pagination/Pagination';
 
class ListReview extends Component {
    
    constructor(props) {
        super(props);
        this.state = {reviews: [],
            currentPage: 1,
            postsPerPage: 10,
        };
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
        } else{
            this.setState(this.state.reviews.length)
        }
    }

    render() {
        const { currentPage, postsPerPage, reviews } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = reviews.slice(indexOfFirstPost, indexOfLastPost);
    
        const paginate = pageNum => this.setState({ currentPage: pageNum });
    
        const nextPage = () => this.setState({ currentPage: currentPage + 1 });
    
        const prevPage = () => this.setState({ currentPage: currentPage - 1 });
        return (
            <>
            {console.log("state",this.state)}
                <Container fluid>
                    <Card className="col-12">
                    <h2>Liste des critique</h2>
                    <Table responsive striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Contenu</th>
                                <th>Date de publication</th>
                                <th>Article</th>
                                <th>Auteur</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map( review => (
                                <tr key={review.idReview}>
                                    <td>{review.idReview}</td>
                                    <td>{review.titleReview}</td>
                                    <td>{review.contentReview}</td>
                                    <td><FormattedDate date={review.publishDate}  /></td>
                                    <td>{review.articleTitle}</td>
                                    <td>{review.userUsername}<br /><small>(id :{review.userId})</small></td>
                                    <td><Button variant="danger" onClick={() => { if (window.confirm('Voulez-vous supprimer cette critique ?')) this.deleteReview(review.idReview) } }  variant="outline-danger"><FontAwesomeIcon icon={faTrashAlt} ></FontAwesomeIcon></Button></td>
                                </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Pagination indexOfLastPost={indexOfLastPost} indexOfFirstPost={indexOfFirstPost} postsPerPage={postsPerPage} totalPosts={reviews.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
                    </Card>
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