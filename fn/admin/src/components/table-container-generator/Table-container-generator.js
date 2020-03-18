import React from 'react';

import { TableContainer, Table, TableBody, Paper } from '@material-ui/core';
import TableContainerHead from '../table-container-head';

import useStyles from './Table-container-generator-style';

const TableContainerGenerator = ({ tableTitles, tableItems }) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
            >
                <TableContainerHead titles={tableTitles} />
                <TableBody>{tableItems}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableContainerGenerator;
