import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import FormUser from "./FormUser";

export default function AddUser() {
    const [open, isOpen] = useState(false);

    const handleOpen = () => isOpen(true);
    const handleClose = () => isOpen(false);
    
    const user = useSelector(state => state.user);
    console.log(useSelector(state => state));
    
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
                    alert(response.message);
                    if (response.status === "OK") {
                        handleClose();
                    }
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

            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Créer un utilisateur</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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