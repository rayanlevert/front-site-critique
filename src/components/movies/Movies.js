import {React,Component} from 'react';
import { connect } from 'react-redux';
import CreateMovie from './CreateMovie';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import{
    LOAD_MOVIES_CREATE,
    LOAD_MOVIES_PAGE, 
    UNLOAD_MOVIES_PAGE
  } from '../../redux/actionTypes';
import {movie_view_page_load} from "../../redux/actions/movies/actionMovies";
import agent from "../../api/moviesApi";
import '../../web/css/movies/Movies.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = state => ({
    ...state
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoad: payload =>
    {
        return dispatch({ type: LOAD_MOVIES_PAGE, payload });
    },
    onUnload: () =>
        dispatch({ type: UNLOAD_MOVIES_PAGE }),
    onCreateLoad: payload=>
    {
        return dispatch({ type : LOAD_MOVIES_CREATE, payload })
    },
   movie_view_page_load: () => dispatch(movie_view_page_load(ownProps))
        
  });



  const deleteMovie =(e)=>
      {
        let movieId = e.target.getAttribute("data-id");
        agent.Movies.delete(movieId).then(res =>{
          console.log("film supprimé "+movieId);
          console.log(res);
        });
      };
  
class Movies extends Component
{
    moviesList = [];
    constructor(props)
    {
        super(props);
        this.state = {
            movie: []
        }
        console.log("this.props à la fin de constructor(props)");
        console.log(props);
        
    }



      //détruira proprement les données du composant afin d'alléger le site et optimiser la navigation - A FAIRE PLUS TARD
      componentWillUnmount() { 
        this.props.onUnload();
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
      //quand le composé est monté : chargement de la liste + définition state
      componentDidMount(){
        this.props.onLoad(
          agent.Movies.all.then((res) =>{
          this.setState({movie : res});
        }));
      }


      isAdmin(){
        try{
            if(this.props.userAuth.isLogged === true && this.props.userAuth.roles !== undefined)
            {
              if(this.props.userAuth.roles[0].name == "ROLE_ADMIN")
              {
                return true;
              }
              else{
                return false;
              }
            }
            
          }
          finally{} 
      }
      adminCreateForm()
      {
        if(this.isAdmin())
        {
          return(
            
                  <CreateMovie/>
          );
        }
      }
      adminDeleteForm(id){
        if(this.isAdmin())
        {
          return(
            <div className="m-3 border-top p-3">
            <Button className="btn-danger" id="del-movie" data-id={id} onClick={deleteMovie}><FontAwesomeIcon icon={faMinusCircle} /></Button>
            </div>
          );
        }
      }

      
      render = () => {
          return (<>
                  
              <Row className="col-12 justify-content-around">
               { this.state.movie.map(movie=>
                 <>
                <div id="admin-create-movie-btn">
                {this.adminCreateForm()}  
                </div>
               <Col className="col-auto m-5">
                 
               <div className="card movie-card" key={ movie.id }>
                <img className="card-img-top img-movie" id={"img-"+movie.id} data-lazy={ this.getPoster(movie.title, movie.id) } />
                <div className="card-body movie-card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(movie.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ movie.genre }</p>
                    <p className="card-deck justify-content-around  text-black-50">A partir de {movie.minAge} ans</p>
                    <Link id="view-movie" className="btn" to={`/movie/view/${movie.id}`} >VOIR LA FICHE</Link>
                    
                    { this.adminDeleteForm(movie.id) }
                </div>
                </div>
               </Col>
      </>)}
            </Row>
          </>)
      }

}
export default connect(mapStateToProps,mapDispatchToProps)(Movies)