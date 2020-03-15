import React from 'react';
import { TableFooter, TableRow, TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';

import { setCurrentPage, setRowsPerPage } from '../../actions';
import TablePaginationActions from './Paginator-control';

const selectProps = {
    inputProps: { 'aria-label': 'rows per page' },
    native: true,
};

const TablePaginator = ({
    currentPage,
    pagesCount,
    rowsPerPageOptions,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
}) => {
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setCurrentPage(0);
    };

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={pagesCount}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    SelectProps={selectProps}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};

const mapStateToProps = ({
    paginationState: { pagesCount, rowsPerPageOptions, rowsPerPage, currentPage },
}) => ({
    pagesCount,
    rowsPerPageOptions,
    rowsPerPage,
    currentPage,
});

const mapDispatchToProps = { setRowsPerPage, setCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(TablePaginator);
