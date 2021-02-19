import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Unauthorized() {

    return (
        <>
            <h2><FontAwesomeIcon color="yellow" icon={faExclamationTriangle}></FontAwesomeIcon>401 - Unauthorized</h2>
            <p>
                Vous n'avez pas les permissions pour accèder à cette page.<br />
                <small>Veuillez contacter l'administrateur pour plus de renseignements.</small>
            </p>

            <p>Revenir à la page d'<Link to={"/"}>accueil</Link></p>
        </>
    )
}