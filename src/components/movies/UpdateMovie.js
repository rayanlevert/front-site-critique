import { Col, Form, Row, Button } from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import { connect } from "react-redux";
import { useState } from 'react';
import { withRouter } from "react-router-dom";
import {
    LOAD_MOVIES_UPDATE_SUBMITTED
} from "../../redux/actionTypes";
import {load_movies_update_submitted} from "../../redux/actions/movies/actionMovies";
import agent from "../../api/moviesApi";
function UpdateMovie( {movieEdit} ){

const [movie, setstate] = useState({...movieEdit});
//gestion soumission
const handleCreate = state =>{
    console.log(movie);
    console.log(state);
    let movieSubmitted = movie;
    try{
        let movieValidated = movieValidation(movieSubmitted);
        if(movieValidated === true && movie.creationArticleDate != null)
        {
            movieSubmitted.creationArticleDate = (new Date(movieSubmitted.creationArticleDate)).toJSON();
            movieSubmitted.publishDate = (new Date(movieSubmitted.publishDate)).toJSON();
            console.log("movieSubmitted juste avant requete");
            console.log(movieSubmitted);
            agent.Movies.update(JSON.stringify(movieSubmitted)).then((res) => {
                console.log("resultat requete")
                console.log(res);
                /* REDIRECTION A FAIRE */
            });
            console.log("Prêt pour UP");
            
        }
    }catch(e){
        return null;
    }
}
const movieValidation = (movieToValid) =>
{
    let val = false;
    try{
        //validations            
        val = true;
    }
    catch(e){
        //erreurs
        console.log("validation catch : ");
        console.log(e);
        val = false;
    }
    finally{
        return val;
    }
}
    const changeMovieValues = (e) =>{
        console.log(e);
        var dataElement = e.target.name;
        var dataValue = e.target.value;
        setstate({ ...movieEdit, [dataElement] : dataValue });
    }
    const changeWebContent = (content, editor) =>{
        let dataElement = editor.id;
        setstate({...movieEdit, [dataElement] : content});
    }
    
    return(
        <>
        <Form className="col-12 align-content-around align-self-center">
            <Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Titre du film</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="title" type="text" placeholder="Titre du film" defaultValue={ movieEdit.title } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="publishDate">
                        <Form.Label>Date de sortie</Form.Label>
                        <Form.Control valid="true" contentEditable="true" type="date" as="input" name="publishDate" placeholder="01-01-1977" defaultValue={ ((new Date(movieEdit.publishDate)).toLocaleDateString()) } onChange={ changeMovieValues } />
                    </Form.Group>
                    

                    <Form.Group controlId="minAge">
                        <Form.Label>Age minimum pour voir le film</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="minAge" type="number" placeholder="12" defaultValue={ movieEdit.minAge } onChange={ changeMovieValues } className="inline-block col-6" />
                    </Form.Group>
                    <Form.Group controlId="genre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="genre" type="text" placeholder="Fiction, Action" defaultValue={ movieEdit.genre } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="duration">
                        <Form.Label>Durée en minutes</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="duration" type="number" placeholder="0" defaultValue={ movieEdit.duration } onChange={ changeMovieValues } />
                    </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="creationArticleDate">
                        <Form.Label>Date de publication sur le site</Form.Label>
                        <Form.Control valid="true" contentEditable="true" type="date" as="input" name="creationArticleDate" placeholder="01-01-1977" defaultValue={ ((new Date(movieEdit.creationArticleDate)).toLocaleDateString()) } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="realisator">
                        <Form.Label>Réalisateur</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="realisator" type="text" placeholder="Sam Raimi" defaultValue={ movieEdit.realisator } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="actors">
                        <Form.Label>Acteurs principaux</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="actors" type="text" placeholder="Daniel Radcliffe, Robert Downey Jr." defaultValue={ movieEdit.actors } onChange={ changeMovieValues } />
                    </Form.Group>
                    <Form.Group controlId="nationality">
                        <Form.Label>Pays d'origine</Form.Label>
                        <Form.Control valid="true" contentEditable="true" name="nationality" type="text" placeholder="Français, Américain" defaultValue={ movieEdit.nationality } onChange={ changeMovieValues } />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>
            
            <Form.Group controlId="synopsis">
                <Form.Label>Synopsys du film</Form.Label>
                <Form.Control valid="true" contentEditable="true" as="textarea" rows="4" name="synopsys" placeholder="Saisir synopsis" defaultValue={ movieEdit.synopsys } onChange={ changeMovieValues } />
            </Form.Group>

            <Form.Group controlId="webContent">
                <Form.Label>Contenu supplémentaire</Form.Label>
                <Editor
                    valid="true"
                    textareaName = "webContent"
                    id = "webContent"
                    contentEditable="true"
                    apiKey="mz2rtkyzjz6zvrhbjko7p44n2wf4prqvbiwql7mwplxky7z2"
                    textareaName="webContent"
                    initialValue={ movieEdit.webContent }
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help'
                      }}
                    onEditorChange={ changeWebContent }
                />
                
            </Form.Group>
            <Button onClick={handleCreate} className="btn-success col-3">Valider modifications</Button>
        </Form>
        </>
    );

}
const mapDispatchToProps = (dispatch) => {
    return { handleCreate: (state) => {
        return dispatch(LOAD_MOVIES_UPDATE_SUBMITTED,load_movies_update_submitted(state));
    },
 }
}
export default withRouter(connect(null,mapDispatchToProps)(UpdateMovie));