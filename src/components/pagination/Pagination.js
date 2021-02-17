import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const { postsPerPage, totalPosts, paginate, nextPage, prevPage, indexOfFirstPost, indexOfLastPost  } = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="mt-2">
                <ul className="pagination justify-content-center">
                    {indexOfFirstPost !== 0 && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => prevPage()}>Précedent</a>
                        </li>
                    )}

                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
                        </li>
                    ))}
                    {totalPosts >= indexOfLastPost && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => nextPage()}>Suivant</a>
                        </li>
                    )}

                </ul>
            </nav>
        )
    }
}

export default Pagination