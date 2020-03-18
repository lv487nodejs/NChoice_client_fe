import React from 'react';
import { connect } from 'react-redux';

import { TableContainer, Table, TableBody, Paper } from '@material-ui/core';
import TableContainerHead from '../table-container-head';

import useStyles from './Table-container-generator-style';
import TablePaginator from '../table-container-paginator';

const TableContainerGenerator = ({ tableTitles, tableItems, pagination, dense }) => {
    const classes = useStyles();

    return (
        <div>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} stickyHeader size={dense ? 'small' : 'medium'}>
                    <TableContainerHead titles={tableTitles} />
                    <TableBody>{tableItems}</TableBody>
                </Table>
            </TableContainer>
            {pagination && <TablePaginator />}
        </div>
    );
};

const mapStateToProps = ({ tableState: { dense } }) => ({ dense });

export default connect(mapStateToProps)(TableContainerGenerator);
