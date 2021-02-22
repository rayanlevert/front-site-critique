import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
import {React,Component,useState} from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import agent from '../../api/moviesApi';
import { LOAD_HOME_PAGE } from "../../redux/actionTypes";
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faMinusCircle, fas } from '@fortawesome/free-solid-svg-icons';
const getArticles = (page,size) => {
    
    return null;
}

class HomeIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            articles : []
        }
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
            console.log(res);
        });
        console.log(this.state);
             
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
                  document.getElementById("img-"+id).setAttribute("src","https://picsum.photos/600/800");
                }
            });
    };

    render(){
        console.log(this.state.articles.movies);
        //const movies = this.state.articles.movies;
        return(
            <>
    { /*this.state.articles.movies.map(movie=> 
               <Col className="col-auto m-5">
               <div className="card movie-card" key={ movie.id }>
                <img className="card-img-top img-movie" id={"img-"+movie.id} data-lazy={ this.getPoster(movie.title, movie.id) } />
                <div className="card-body movie-card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(movie.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ movie.genre }</p>
                    <p className="card-deck justify-content-around  text-black-50">A partir de {movie.minAge} ans</p>
                    <Link className="btn" to={`/movie/view/${movie.id}`} >VOIR LA FICHE</Link>
                    <div className="m-3 border-top p-3">
                    <Button className="btn-danger" data-id={movie.id} ><FontAwesomeIcon icon={faMinusCircle} /></Button>
                    </div>
                </div>
                </div>
               </Col>
    )*/}
            </>
        )
    }
}
const mapStateToProps = state =>
({
    articles : getArticles(0,3)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoad: payload =>
    {
        return dispatch({ type: LOAD_HOME_PAGE, payload });
    },        
  });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeIndex))