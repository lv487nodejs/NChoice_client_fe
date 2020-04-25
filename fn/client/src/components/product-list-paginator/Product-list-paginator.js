import React from 'react';
import { connect } from 'react-redux';
import './Product-list-paginator.css';

function ProductListPaginator({ pagesCount, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= pagesCount; i += 1) {
        pageNumbers.push(i);
    };
    const pageNumbersView = pageNumbers.map(number => {                    
        let activeClass = '';
        number - 1 === currentPage ? activeClass = 'active' : activeClass = '';
        return (
            <li
                key={number}
                className={`list-group-item-dark page-item page-link paginator-buttons
                ${activeClass}`}
                onClick={() => {
                    paginate(number)
                }}>
                {number}
            </li>
        )
    });
    return (
        <nav>
            <ul className="pagination">
                {pageNumbersView}
            </ul>
        </nav>
    );
}
const mapStateToProps = ({ productsList: {currentPage} }) => ({ currentPage })
export default connect(mapStateToProps)(ProductListPaginator)