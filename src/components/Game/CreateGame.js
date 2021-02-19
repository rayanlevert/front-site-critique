import React, { Component } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';

class CreateGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            publishDate: '',
            creationArticleDate: '',
            minAge: 0,
            developer: '',
            publisher: '',
            platform: '',
            genre: '',
            resume: '',
            valid: false,
            file: '',
            imagePreviewUrl: ''
        };
        this.onChangeGameHandle = this.onChangeGameHandle.bind(this);
        this._handleSubmit= this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        /*const date = new Date();
        let reviewToJSON =  {
            title: this.state.title,
            publishDate: date.toJSON(),
            creationArticleDate: date.toJSON(),
            minAge: this.state.minAge,
            developer: this.state.developer,
            publisher: this.state.publisher,
            platform: this.state.platform,
            genre: this.state.genre,
            resume: this.state.resume,
            valid: true
        }
        console.log(JSON.stringify(reviewToJSON));
        fetch('http://localhost:8080/api/game', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewToJSON)
        })
            .then(res => this.props.history.push('/listgame'))
            .catch(err => alert("Erreur s'est produite lors de la création de votre critique, veuillez réesasayer"))*/

    }
    
    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
        const data = new FormData();
        data.append('photo', file );
        fetch("http://localhost:3000/ressources/img/article/game", {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'multipart/form-data'
             },
             body: data
        }).then((response) =>  {
           console.log(response.text());
        })
        .catch(error => console.log(error))
    }

    onChangeGameHandle = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    re
    render() {
        console.log(this.state)
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} width="50%" className="img-fluid" alt="image de l'affiche du jeux video de l'article" title="image de l'affiche du jeux video de l'article" />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <>
                 <Col lg="12">      
                    <Card className="m-5">
                        <Card.Body>
                            <h2>{this.state.title}</h2>
                            <Row className="mt-3">
                                <Col lg="5">
                                {$imagePreview}
                                
                                </Col>
                                <Col lg="7">
                                    <ListGroup>
                                        <ListGroup.Item><b>Min age : </b>{this.state.minAge}</ListGroup.Item>
                                        <ListGroup.Item><b>Genre : </b>{this.state.genre}</ListGroup.Item>
                                        <ListGroup.Item><b>Developpeur : </b> {this.state.developer}</ListGroup.Item>
                                        <ListGroup.Item><b>Producteur : </b>{this.state.publisher}</ListGroup.Item>
                                        <ListGroup.Item><b>Plateforme : </b>{this.state.platform}</ListGroup.Item>
                                        <ListGroup.Item><h3 className="list-group-item-heading">Résume</h3>{this.state.resume}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col lg="1">
                                <input className="fileInput" type="file"  onChange={(e)=>this._handleImageChange(e)} />
                                </Col>
                            </Row>                                   
                            <Form className="mt-5 text-left">
                                <Row>
                                    <Col lg="6">
                                        <Form.Group controlId="title">  
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control  type="text" placeholder="Entrez le titre de l'article" value={this.state.title} onChange={this.onChangeGameHandle} required/>
                                        </Form.Group>
                                        <Form.Group controlId="minAge">
                                            <Form.Label>Minimum age</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le minimum d'âge " value={this.state.minAge} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                        <Form.Group controlId="genre">
                                            <Form.Label>Genre</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le genre de l'article" value={this.state.genre} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                        <Form.Group controlId="developer">
                                            <Form.Label>Developpeur</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le développeur ou les déveoppeurs (entre/)" value={this.state.developer} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                        <Form.Group controlId="publisher">
                                            <Form.Label>Producteur</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez le producteur" value={this.state.publisher} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                        <Form.Group controlId="platform">
                                            <Form.Label>Plateforme</Form.Label>
                                            <Form.Control type="text" placeholder="Entrez la plateforme" value={this.state.platform} onChange={this.onChangeGameHandle} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <Form.Group controlId="resume">
                                            <Form.Label>Résume</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={this.state.resume} onChange={this.onChangeGameHandle}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit" onClick={this._handleSubmit}>Sauvegarde</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>
            </>
        );
    }
}

export default CreateGame;
