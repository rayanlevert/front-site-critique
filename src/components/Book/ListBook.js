import React, { Component } from 'react';
import { Card, ListGroup,Button } from 'react-bootstrap';
import { FormattedDate } from '../Date/FormattedDate';
import Review from '../review/Review';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { withRouter,useParams  } from 'react-router-dom';

class ListBook extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    async componentDidMount(){
        console.log('GAME');
        const response = await fetch('http://localhost:8080/api/book/getAll');
        const books = await response.json();
        this.setState({ books });
        console.log(books); 
    }

    render() {
        const numInRow = 2;
        return (
            <> 
                  <h2>BOOK</h2>
            </>
        );
    }
}

export default withRouter(ListBook);
