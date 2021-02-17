import React, { Component } from 'react';
import { Card,Form,Button } from 'react-bootstrap';

class CreateReview extends Component {
    constructor(props) {
        super(props);
        const genre = this.props.location.state.genre;
        const idArticle = this.props.location.state.articleId;

        this.state = {
            titleReview: '',
            contentReview: '',
            noteReview: null,
            publishDate: '',
            user: { id: 3}, 
            article:{ id: this.props.location.state.articleId },
            path: 'article/' + genre + '/' + idArticle
        }
        this.changeTitleReviewHandle = this.changeTitleReviewHandle.bind(this);
        this.changeContentReviewHandle = this.changeContentReviewHandle.bind(this);
        this.changeNoteReviewHandle = this.changeNoteReviewHandle.bind(this);
        this.saveReview = this.saveReview.bind(this);
    }

    saveReview = (e) => {
        e.preventDefault();
        const date = new Date();
        let reviewToJSON =  {
            titleReview: this.state.titleReview,
            contentReview: this.state.contentReview,
            noteReview: this.state.noteReview,
            publishDate: date.toJSON(),
            user: { id: 3}, 
            article:{ id: this.props.location.state.articleId }
        }
        console.log(JSON.stringify(reviewToJSON));
        fetch('http://localhost:8080/api/reviews/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewToJSON)
        })
            .then(res => this.props.history.push(this.state.path))
            .catch(err => alert("Erreur s'est produite lors de la création de votre critique, veuillez réesasayer"))
    }

    changeTitleReviewHandle = (event) => {
        this.setState({titleReview: event.target.value});
    }

    changeContentReviewHandle = (event) => {
        this.setState({contentReview: event.target.value});
    }

    changeNoteReviewHandle = (event) => {
        this.setState({noteReview: event.target.value});
    }
    cancel(){
        this.props.history.push(this.state.path);
    }

    render() {
        return (
            <div className="col-12 mt-5 mb-5">
                <Card>
                    <h2>Rédaction d'une critique pour <i>{this.props.location.state.articleTitle}</i></h2>
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
                            <Form.Label className="float-left">Votre note pour cette critique : </Form.Label>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="0" name="noteReview" value='0' type={type} id={`inline-${type}-0`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="1" name="noteReview" value='1' type={type} id={`inline-${type}-1`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="2" name="noteReview" value='2' type={type} id={`inline-${type}-2`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="3" name="noteReview" value='3' type={type} id={`inline-${type}-3`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="4" name="noteReview" value='4' type={type} id={`inline-${type}-4`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="5" name="noteReview" value='5' type={type} id={`inline-${type}-5`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="6" name="noteReview" value='6' type={type} id={`inline-${type}-6`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="7" name="noteReview" value='7' type={type} id={`inline-${type}-7`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="8" name="noteReview" value='8' type={type} id={`inline-${type}-8`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="9" name="noteReview" value='9' type={type} id={`inline-${type}-9`} />
                                <Form.Check onChange={this.changeNoteReviewHandle} inline label="10" name="noteReview" value='10' type={type} id={`inline-${type}-10`} />
                            </div>
                        ))}
                        <Button size="lg" block variant="primary" type="submit" onClick={ this.saveReview}>Créer votre critique</Button>
                        <Button size="lg" block variant="danger" onClick={ this.cancel.bind(this)}>Annuler la création de votre critique</Button>
                    </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CreateReview;

/**
 * TODO
 * 
 * récupere id user 
 */