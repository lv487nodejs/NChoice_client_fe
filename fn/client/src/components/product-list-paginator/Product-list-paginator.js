import React from 'react';

import './Product-list-paginator.css';

export default function ProductListPaginator({ pagesCount, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= pagesCount; i += 1) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        className="page-item page-link"
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
