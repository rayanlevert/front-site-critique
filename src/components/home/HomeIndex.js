import { faHotjar, faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
import {React,Component,useState} from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import agent from '../../api/moviesApi';
import { LOAD_HOME_PAGE } from "../../redux/actionTypes";
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCoffee,faFilm,faGamepad,faGlassCheers,faMinusCircle, faNewspaper, faPlayCircle, fas, faScroll } from '@fortawesome/free-solid-svg-icons';
import "../../web/css/home/Home.css";
const getArticles = (page,size) => {
    
    return null;
}
const getMovieComedie = (search, filter, filterValue) =>{
    return null;
}

class HomeIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            movieComedy : [],
            milesGame : [],
            user: [],
        }
        const user = props.user;

    }
    
    async componentDidMount(){
        fetch('http://localhost:8080/api/articles/page', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([0,3])
        }).then(async response => {
            let res = await response.json();
            this.setState({ articles : res });
        });
        
        fetch('http://localhost:8080/api/movies/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(["","genre","comédie"])
        }).then(async response => {
            let res = await response.json();
            console.log(res);
            this.setState({ movieComedy : res });
        });
        let gameToSearch = "Marvel's Spider-Man : Miles Morales"
        fetch('http://localhost:8080/api/game/byTitle/'+gameToSearch).then(async response => {
            let res = await response.json();
            console.log(res);
            this.setState({ milesGame : res });
        }); 
    }

    getPoster(title, id){
        fetch('https://api.themoviedb.org/3/search/movie?api_key=01195188722d58d88247d177a9a84eb6&language=fr-FR&query='+title+'&page=1&include_adult=true').then(async res =>
            {
                const dataByTitle = await res.json();
                
                try
                {
                  const dataImg = dataByTitle.results[0].poster_path;
                  const resImg = "https://image.tmdb.org/t/p/original"+dataImg;
                  document.getElementById("img-"+id).setAttribute("src",resImg);
                }
                catch(e){
                try{
                    document.getElementById("img-"+id).setAttribute("src","https://picsum.photos/600/800");
                }catch{}
                }
                finally{
                    try{
                        const dataImg = dataByTitle.results[0].poster_path;
                  const resImg = "https://image.tmdb.org/t/p/original"+dataImg;
                        document.getElementById("img-movieComedy-"+id).setAttribute("src",resImg);                    }catch{}
                }
            });
    };

    
    createdReview = (id,title) => {
        this.props.history.push({
            pathname : '/create-review',
            state :{
            articleId : id,
            articleTitle : title,
            genre: "movie",
            userId: this.state.user.userId
            }});
    }
    render(){
        let movies = this.state.articles.movies || [];
        let games = this.state.articles.games || [];
        let movieComedy = this.state.movieComedy[0] || [];
        let milesGame = this.state.milesGame || [];
        console.log(games);
        console.log("this.state.articles.movies",movies)
        
        return(
            <>  
            <div id="home-body">
            <h1 id="home-main-title" className="block"><FontAwesomeIcon icon={faPlayCircle} className="align-bottom" /> Bienvenue sur <span style={{fontFamily: "Mania"}}>CritiquesMania</span> !<br />
            <small className="text-muted inline" id="small-home-main-title">La communauté multimédia sérieuse, fun et surtout totalement gratuite</small>
            </h1>

            <Row className="col-12 d-flex">
            <section id="home-movies" className="col-6 row justify-content-center">
            <h4 className="block col-12 home-cat-header"><FontAwesomeIcon icon={faFilm} />  Films récemment ajoutés</h4>

            {   movies.map(movie =>                 
                <Col className="col-3 ">
               <div className="card movie-card-home" key={ movie.id }>
                <img className="card-img-top img-movie-home" id={"img-"+movie.id} data-lazy={ this.getPoster(movie.title, movie.id) } />
                <div className="card-body movie-card-body" id="movie-card-body">
                    <h6 className="card-title-home">{movie.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(movie.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ movie.genre }</p>
                    <Link id="view-movie" className="btn" to={`/movie/view/${movie.id}`} >VOIR LA FICHE</Link>
                </div>
                </div>
               </Col>
                )
            }
            </section>
            <section id="home-games" className="col-6 row justify-content-center">
            <h4 className="block col-12 home-cat-header"><FontAwesomeIcon icon={faGamepad} />  Jeux vidéos récemment ajoutés</h4>
            {   games.map(game =>                 
                <Col className="col-3 m-1">
               <div className="card movie-card-home" key={ game.id }>
                <img className="card-img-top img-movie-home" id={"img-"+game.id} src={`../ressources/img/article/game/${game.id}.jpg`} />
                <div className="card-body movie-card-body" id="movie-card-body">
                    <h6 className="card-title-home">{game.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(game.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ game.developer }</p>
                    <Link id="view-movie" className="btn" to={`/article/game/${game.id}`} >VOIR LA FICHE</Link>
                </div>
                </div>
               </Col>
                )
            } 
            </section></Row>
            <Row>
            <section className="col-6 row justify-content-center">
                <h4 className="col-12 hot-main-title"><FontAwesomeIcon icon={faGlassCheers} />  Pour passer un bon moment en famille</h4>
                <Col className="col-12 m-1">
                <div className="card movie-card-comedy position-relative" key={ movieComedy.id }>
                <Row>
                    <Col className="col-6"> 
                        <span className="badge-home-cat"><FontAwesomeIcon icon={faHotjar} color="orange" /></span>
                        <img className="card-img-top comedy-img" id={"img-movieComedy-"+movieComedy.id} data-lazy={ this.getPoster(movieComedy.title, movieComedy.id) } />
                    </Col>
                    <Col className="col-6">
                    <div className="card-body movie-card-body" id="movie-card-body">
                    <h6 className="comedy-title">{movieComedy.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(movieComedy.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ movieComedy.realisator }</p>
                    <Link id="view-movie" className="btn btn-hot" to={`/movie/view/${movieComedy.id}`} >VOIR LA FICHE</Link>
                    </div>
                    </Col>
                </Row>
               
                
                </div>
               </Col>
            </section>

            <section className="col-6 row justify-content-center">
                <h4 className="col-12 hot-main-title"><FontAwesomeIcon icon={faNewspaper} />  Votre avis nous intéresse</h4>
                <Col className="col-12">
               <div className="card movie-card-comedy position-relative" key={ milesGame.id }>

               <Row>
                <Col className="col-6"> 
                <span className="badge-home-cat"><FontAwesomeIcon icon={faBook} color="darkred" /></span>
                <img className="card-img-top comedy-img" id={"img-milesGame-"+milesGame.id} src={`../ressources/img/article/game/${milesGame.id}.jpg`} />
                </Col>
                <Col className="col-6">
                    <div className="card-body movie-card-body" id="movie-card-body">
                    <h6 className="comedy-title">{milesGame.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(milesGame.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ milesGame.developer }  { milesGame.platform }</p>
                    <Button id="view-movie" className="btn btn-hot" onClick={() => this.createdReview(milesGame.id, milesGame.title)} >Laisser un avis</Button>
                </div>
                 </Col>
</Row></div></Col></section></Row>
            
            

            <section id="best-games">
                <h4>Les jeux les plus populaires en ce moment</h4>
                <Row className="col-12 justify-content-around">
                    <div className="col-4">
                        <h6>Marvel's Spider-Man : Miles Morales</h6>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gBxBdZwok6E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="col-4">
                        <h6>Call of Duty : Cold War</h6>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rKRqh7aVRFU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="col-4">
                        <h6>Hitman 3</h6>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/l8dTnM9TRuo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </Row>
            </section>
            </div>
            </>
        )
    }
}
/*const mapStateToProps = state =>
({
    articles : getArticles(0,3),
    movieComedy : getMovieComedie("","genre","comédie")
});*/
const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoad: payload =>
    {
        return dispatch({ type: LOAD_HOME_PAGE, payload });
    },        
  });
  const mapStateToProps = state => ({
    ...state
  });
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomeIndex))