import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import FormUser from "./FormUser";

export default function AddUser() {
    const [open, isOpen] = useState(false);

    const handleOpen = () => isOpen(true);
    const handleClose = () => isOpen(false);

    const user = useSelector(state => state);

    const handleSubmit = () => {
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => alert("L'utilisateur a été créé"))
            .catch(err => alert("erreur"))
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