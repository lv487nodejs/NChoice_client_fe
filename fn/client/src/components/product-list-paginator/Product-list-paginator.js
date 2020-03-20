import React from 'react';

import './Product-list-paginator.css';

export default function ProductListPaginator({ pagesCount, paginate }) {
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
                        className="list-group-item-dark page-item page-link paginator-buttons"
                        onClick={(e) => {
                            const allButtons = document.querySelectorAll('.paginator-buttons');
                            allButtons.forEach((elem)=>{
                                elem.classList.remove('active');
                            })
                            e.target.classList.add('active');
                            paginate(number)}}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
