import React from 'react';

import './Product-list-paginator.css';
import { connect } from 'react-redux';

function ProductListPaginator({ pagesCount, paginate, currentPage }) {
    const pageNumbers = [];
console.log(pagesCount);

    for (let i = 1; i <= pagesCount; i += 1) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        className="list-group-item-dark page-item page-link"
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
const mapStateToProps = ({ productsList:{ pagesCount }}) => {
    return { pagesCount }
}
export default connect(mapStateToProps)(ProductListPaginator)
