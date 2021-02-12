import React, { Component } from 'react';

export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { reviews: [] }
    }

    async componentDidMount(){
        const response = await fetch('http://localhost:8080/api/reviews/article/2');
        const reviews = await response.json();
        this.setState({ reviews });
        console.log(reviews);
    }

    render() {
        return (
            <table width="100%" cellspacing="0" cellpadding="5" border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th>user id</th>
                    <th>article id</th>
                </tr>
                </thead>
                <tbody id="users">
                    {
                        this.state.reviews.map( review => (
                            <tr key={review.idReview}>
                                <td>{ review.idReview }</td>
                                <td>{ review.titleReview }</td>
                                <td>{ review.contentReview }</td>
                                <td>{ review.noteReview }</td>
                                <td>{ review.publishDate.slice(0, 19).replace('T', ' ') }</td>
                                <td>{ review.userId }</td>
                                <td>{ review.articleId }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}
