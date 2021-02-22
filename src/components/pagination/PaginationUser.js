import React, { Component } from 'react'

export class PaginationUser extends Component {
    render() {
        const { usersPerPage, totalUsers, paginate, nextPage, prevPage, indexOfFirstUser, indexOfLastUser } = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="mt-2">
                <ul className="pagination">
                    {indexOfFirstUser !== 0 && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => prevPage()}>Précedent</a>
                        </li>
                    )}

                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
                        </li>
                    ))}
                    {totalUsers > indexOfLastUser && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => nextPage()}>Suivant</a>
                        </li>
                    )}

                </ul>
            </nav>
        )
    }
}

export default PaginationUser