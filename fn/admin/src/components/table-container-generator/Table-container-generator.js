import React from 'react';

import { TableContainer, Table, TableBody, Paper } from '@material-ui/core';
import TableContainerHead from '../table-container-head';

import useStyles from './Table-container-generator-style';
import TablePaginator from '../table-container-paginator';

const TableContainerGenerator = ({ tableTitles, tableItems, pagination }) => {
    const classes = useStyles();

    return (
        <div>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableContainerHead titles={tableTitles} />
                    <TableBody>{tableItems}</TableBody>
                </Table>
            </TableContainer>
            {pagination && <TablePaginator />}
        </div>
    );
};

export default TableContainerGenerator;
