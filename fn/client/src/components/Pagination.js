import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default function PaginationJs({ postPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];
    const pagesCount = Math.ceil(totalPosts / postPerPage);
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
    };
    return (
        <Pagination count={pagesCount}
            page={currentPage}
            onChange={paginate}
            shape="rounded"
        />
    )
}
