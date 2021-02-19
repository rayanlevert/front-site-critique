import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function InternalServerError() {

    return (
        <>
            <h2><FontAwesomeIcon color="red" icon={faExclamationTriangle}></FontAwesomeIcon> Erreur serveur interne</h2>
            <p>
                La requête n'a pas pu être effectuée dûe à une erreur du server interne.<br />
                <small>Veuillez contacter l'administrateur pour plus de renseignements.</small>
            </p>

            <p>Revenir à la page d'<Link to={"/"}>accueil</Link></p>
        </>
    )
}