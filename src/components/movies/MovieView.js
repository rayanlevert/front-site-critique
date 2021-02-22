import {React, Component} from 'react';
import '../../web/css/movies/MoviesView.css';
import agent from "../../api/moviesApi";
import { Card, ListGroup,Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import UpdateMovie from "./UpdateMovie";
import Review from '../review/Review';
import { FormattedDate } from '../Date/FormattedDate';
import { connect } from 'react-redux';


    
    

class MovieView extends Component{    
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { movie: [], redirectError: false, user:[], show: false };
        this.createdReview = this.createdReview.bind(this);
        const user = props.user;
    }

    
    componentDidMount()
    {
        
        agent.Movies.findOneById(this.props.match.params.id).then(res =>{
        console.log(res);
        this.setState({ movie : res });
    });

    }
    

    createdReview(){
        this.props.history.push({
            pathname : '/create-review',
            state :{
            articleId : this.state.movie.id,
            articleTitle : this.state.movie.title,
            genre: "movie",
            userId: this.state.user.userId
            }});
    };
    
    getPoster(title){
        fetch('https://api.themoviedb.org/3/search/movie?api_key=01195188722d58d88247d177a9a84eb6&language=fr-FR&query='+title+'&page=1&include_adult=true').then(async res =>
            {
                const dataByTitle = await res.json();
                let resImg;
                try{
                    const dataImg = dataByTitle.results[0].poster_path;
                    resImg = "https://image.tmdb.org/t/p/original"+dataImg;
                    document.getElementById("imgMovie").setAttribute("src",resImg);
                }
                catch(e){
                    resImg = "https://picsum.photos/600/800";
                }
                
                
            });
    };
    
    
render() {
    const movie = this.state.movie;
    const toggleOpen =() =>{
        this.setState({show : true})
        } 
    const toggleClose = () => {
            this.setState({ show : false })
        }
    const isAdmin = () =>{
        console.log("fonction ISADMIN");
        console.log(this.props.user);
        try{
            if(this.props.userAuth.isLogged === true && this.props.userAuth.roles !== undefined)
            {
                if(this.props.userAuth.roles[0].name == "ROLE_ADMIN")
                {
                    return(<>
                        <Button size="lg" onClick={ toggleOpen }>Editer</Button>
                        <Modal size="lg" id="formModal"  show={this.state.show} onHide={ toggleClose }>
                        <Modal.Header closeButton>
                            <Modal.Title>Ajouter un nouveau film</Modal.Title>
                        </Modal.Header>
        
                        <Modal.Body>
                            <UpdateMovie movieEdit={movie} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Row className="col-12 justify-content-around p-4">
                                <Button onClick={toggleClose} className="btn-warning col-3">Annuler</Button></Row>
                                    <Alert>
                                        <Alert.Link></Alert.Link>
                                    </Alert>
                        </Modal.Footer>
                        </Modal>
        </>);
                }
            }
                
            }
            finally{}
    };
    return (
        <> 
        {isAdmin()}
        
        <Row className="col-12 align-self-center">
            <Col>      
            <Card className="col-12">
                <Card.Body>
                    <h2>{movie.title}</h2>
                    <Row className="mt-3">
                            <Col lg="5" >
                            <img data-lazy={ this.getPoster(movie.title) } id="imgMovie" className="w-50" alt="Image de présentation du film" title="image promotionnelle du film" />   
                            </Col>
                            <Col lg="7">
                                <ListGroup>
                                    <ListGroup.Item><b>Age minimum : </b>{movie.minAge}</ListGroup.Item>
                                    <ListGroup.Item><b>Date de sortie : </b><FormattedDate date={movie.publishDate}/></ListGroup.Item>
                                    <ListGroup.Item><b>Genre : </b>{movie.genre}</ListGroup.Item>
                                    <ListGroup.Item><b>Réalisateur : </b> {movie.realisator}</ListGroup.Item>
                                    <ListGroup.Item><b> Acteurs principaux: </b>{movie.actors}</ListGroup.Item>
                                    <ListGroup.Item><b>Pays d'origine : </b>{movie.nationality}</ListGroup.Item>
                                    <ListGroup.Item><h3 className="list-group-item-heading">Synopsis</h3>{movie.synopsys}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col  md={{ span: 2, offset: 10 }} className="text-right">
                            <small>Publié le <FormattedDate date={movie.creationArticleDate}/></small>
                            </Col>
                        </Row>  
                    <div className="row">
                        <div className="col-12 mt-3">
                            {this.state.user !== null && (
                            <Button onClick= {this.createdReview} className="float-right" variant="outline-dark"><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon> Rédiger une critique</Button>
                            )}
                        </div>
                    </div>
                    
                    <hr />
                    <Review idArticle={movie.id}></Review>
                </Card.Body>
            </Card>
            <div>{movie.webContent}</div>
            </Col>
            </Row>
            

        </>
    );
}
    
}
const mapStateToProps = state =>({
    ...state
});
export default withRouter(connect(mapStateToProps)(MovieView));