import React from 'react';

import './Product-list-paginator.css';

export default function ProductListPaginator({ postPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];
    const pagesCount = Math.ceil(totalPosts / postPerPage);
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item page-link" onClick={() => paginate(number)}>
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
