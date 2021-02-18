import React, { Component } from 'react';
import { Card,Form,Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
const notes = ["0","1", "2", "3","4","5","6","7","8","9","10"];
// RECUPERER LE GENRE DE LA REVIEW POUR REDIRECTION
class UpdateReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            titleReview: '',
            contentReview: '',
            noteReview: null,
        }
        this.changeTitleReviewHandle = this.changeTitleReviewHandle.bind(this);
        this.changeContentReviewHandle = this.changeContentReviewHandle.bind(this);
        this.changeNoteReviewHandle = this.changeNoteReviewHandle.bind(this);
        this.updateReview = this.updateReview.bind(this);
    }

    async componentDidMount(){
        console.log('affichage review');
        const URL_DELETE_REVIEW = "http://localhost:8080/api/reviews/review/" + this.state.id;
        const response = await fetch(URL_DELETE_REVIEW);
        const reviews = await response.json();
        this.setState({ 
            titleReview: reviews.titleReview,
            contentReview: reviews.contentReview,
            noteReview: reviews.noteReview,
            publishDate: reviews.publishDate,
            user: { id: reviews.userId},
            article: { id: reviews.articleId}
        });
        const userOnline = JSON.parse(localStorage.getItem('user'));
        this.setState({userOnline});
        console.log(this.state);
    }

    updateReview = (e) => {
        if( this.state.userOnline !== null){
            if(this.state.userOnline.userId === this.state.user.id){
                const userOnline = JSON.parse(localStorage.getItem('user'));
                this.setState({userOnline});
                const URL_UPDATE_REVIEW = 'http://localhost:8080/api/reviews/update/' + this.state.id;
                e.preventDefault();
                let reviewToJSON =  {
                    titleReview: this.state.titleReview,
                    contentReview: this.state.contentReview,
                    noteReview: this.state.noteReview
                }
                console.log(JSON.stringify(reviewToJSON));
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reviewToJSON)
                };
                fetch(URL_UPDATE_REVIEW, requestOptions)
                    .then(res => this.props.history.goBack())
                    .catch(err => alert("Erreur lors de la suppresion de la critique"))
            }else{
                alert("vous êtes pas le propriétaire de cette critique");
            }
        }else{
            alert("Veuillez-vous connecter pour modifier une critique");
        }
    }

    changeTitleReviewHandle = (event) => {
        this.setState({titleReview: event.target.value});
    }

    changeContentReviewHandle = (event) => {
        this.setState({contentReview: event.target.value});
    }

    changeNoteReviewHandle = (event) => {
        // TODO condition entre 0 & 10
        this.setState({noteReview: event.target.value});
    }

    cancel(){
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="col-12 mt-5 mb-5">
                <Card>
                    <h2 className="mt-2">Modification de la critique</h2>
                    <Card.Body>
                    <Form>
                        <Form.Group controlId="titleReview">
                            <Form.Label className="float-left">Titre de la critique</Form.Label>
                            <Form.Control type="text" placeholder="Entrez le titre de votre critique" value={this.state.titleReview} onChange={this.changeTitleReviewHandle} />
                        </Form.Group>

                        <Form.Group controlId="contentReview">
                            <Form.Label className="float-left">Contenu de la critique</Form.Label>
                            <Form.Control as="textarea" placeholder="Entrez le contenu de votre critique" rows={3} value={this.state.contentReview} onChange={this.changeContentReviewHandle} />
                        </Form.Group>
                        <Form.Group controlId="contentReview">
                            <Form.Label className="float-left">Note de la critique</Form.Label>
                            <Form.Control type="number" min="0" max="10" placeholder="Entrez le titre de votre critique" value={this.state.noteReview} onChange={this.changeNoteReviewHandle} />
                        </Form.Group>
                        <Button size="lg" block variant="primary" type="submit" onClick={ this.updateReview}>Sauvegarde la modification votre critique</Button>
                        <Button size="lg" block variant="danger" onClick={ this.cancel.bind(this)}>Annuler la modification de votre critique</Button>
                    </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(UpdateReview);
