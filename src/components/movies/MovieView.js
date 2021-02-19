import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import '../../web/css/movies/MoviesView.css';
import { useParams } from 'react-router-dom';
import agent from "../../api/moviesApi";

function MovieView(){
    const[movie, setMovie] = useState(false);
    const params = useParams();
    useEffect(() => {
        
        const id = params.id;
        console.log(params);
        console.log(id);
        agent.Movies.findOneById(id).then(res =>{
        console.log(res);
        setMovie(res);
    });
    },[]);

    return (
        <>
        <div className="container-fluid col-8 border-black">
                <div id="title-movie-view" className="justify-content-center">
                    <h3>{ movie.title }
                        <p className="text-muted" id="age-warning">Déconseillé aux moins de { movie.minAge } ans</p>
                    </h3>
                </div>
                <article className="flex-auto align-content-around col-12">
                    <div className="bg-light-gray col-12 row justify-content-around">
                        <div className="col-4"><span>Date de sortie</span>{ new Date(movie.publishDate).toLocaleDateString() }</div>
                        <div className="col-6"><span>Réalisé par </span>{ movie.realisator }</div>
                        <div className="col-4">Genre : { movie.genre }</div>
                        <div className="col-6">Durée du film : { movie.duration } minutes</div>
                    </div>
                    
                    <div className="col-12">Acteurs principaux : { movie.actors }</div>
                    <div className="col-12">Origine du film : { movie.nationality }</div>
                </article>
            </div>
        </>
    );
}
const mapStateToProps = () => {

    //pour l'update
};
export default connect(mapStateToProps)(MovieView)



/*

            
*/