import React from 'react';

import { Grid } from '@material-ui/core';

import useStyle from './Table-nav-style';
import TableNavCheckboxes from '../table-nav-checkboxes';

const TableNav = () => {
    const classes = useStyle();

    return (
        <Grid
            className={classes.tableNav}
            container
            spacing={3}
            justify="center"
            alignItems="center"
        >
            <Grid item xs>
                <TableNavCheckboxes />
            </Grid>
        </Grid>
    );
};

export default TableNav;
