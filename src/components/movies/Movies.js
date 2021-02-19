import {React,Component} from 'react';
import { connect } from 'react-redux';
import CreateMovie from './CreateMovie';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import{
    LOAD_MOVIES_CREATE,
    LOAD_MOVIES_PAGE, 
    UNLOAD_MOVIES_PAGE
  } from '../../redux/actionTypes';
import {movie_view_page_load} from "../../redux/actions/movies/actionMovies";
import agent from "../../api/moviesApi";
import '../../web/css/movies/Movies.css';
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
  
class Movies extends Component
{
    moviesList = [];
    constructor(props)
    {
        super(props);
        this.state = {
            movie: []
        }
        console.log("this.state à la fin de constructor(props)");
        console.log(this.state);
        
    }

      //détruira proprement les données du composant afin d'alléger le site et optimiser la navigation - A FAIRE PLUS TARD
      componentWillUnmount() { 
        this.props.onUnload();
      }

      //quand le composé est monté : chargement de la liste + définition state
      componentDidMount(){
        this.props.onLoad(
          agent.Movies.all.then((res) =>{
          console.log("Valeur dans componentDidMount : res");
          console.log(res);
          this.setState({movie : res});
          console.log("----------------COMPOSANT MONTE--------------------")
        }));
      }
      render = () => {
        
        console.log("this.state.movie dans render()");
        console.log(this.state.movie);
          return (<>
            <div>------------Déplacé afin d'éviter un nombre considérable d'erreurs lié à l'absence de données-----------</div>
            <div className="modalForm">
            <CreateMovie/>
            </div>
              <Row className="col-12 justify-content-around">
               { this.state.movie.map(movie=> 
               <Col className="col-auto m-5">
               <div className="card" key={ movie.id }>
                <img className="card-img-top" src="https://picsum.photos/286/180" alt="Card image cap" />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <small className="card-subtitle text-muted">{ new Date(movie.publishDate).toLocaleDateString() }</small>
                    <p className="card-text genres">{ movie.genre }</p>
                    <p className="card-deck justify-content-around  text-black-50">A partir de {movie.minAge} ans</p>
                    <Link className="btn" to={`/movie/view/${movie.id}`} >VOIR LA FICHE</Link>
                </div>
                </div>
               </Col>
                )}
            </Row>
          </>)
      }

}
export default connect(mapStateToProps,mapDispatchToProps)(Movies)