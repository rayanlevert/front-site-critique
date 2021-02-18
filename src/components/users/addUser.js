import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Modal } from "react-bootstrap";
import FormUser from "./FormUser";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddUser() {
    const [open, isOpen] = useState(false);
    const [variant, setVariant] = useState("danger");
    const [visible, setVisible] = useState(false);

    const handleOpen = () => isOpen(true);
    const handleClose = () => isOpen(false);

    const user = useSelector(state => state.user);

    const displayAlert = (variant, message) => {
        setVisible(true);
        setVariant(variant);
        let alert = document.getElementById('alert');
        alert.textContent = message;
    }

    const handleSubmit = () => {
        if (user.lastname !== "" && user.firstname !== "" && user.email !== "" && user.password !== "" && user.username !== "") {
            fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(body => body.json().then(response => {
                    if (response.status === "OK") {
                        displayAlert("success", response.message);
                        setTimeout(() => {
                            setVisible(false);
                            handleClose();
                        }, 1000);
                    } else displayAlert("danger", response.message);
                }))
                .catch(error => console.log(error))
        } else {
            alert("Veuillez renseigner tous les champs.");
        }
    }

    return (
        <>
            <Button size="sm" onClick={handleOpen}>
                Créer un utilisateur
            </Button>

            <Modal show={open} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Créer un utilisateur</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert id="alert" variant={variant} show={visible}></Alert>
                    <FormUser></FormUser>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                    <Button variant="primary" onClick={handleSubmit}>Sauvegarder</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}