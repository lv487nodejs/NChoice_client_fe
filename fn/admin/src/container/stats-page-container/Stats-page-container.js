import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from './Stats-page-container-styles';
import LatestOrders from '../../components/statistic-page/components/Latest-orders';
import LatestSales from '../../components/statistic-page/components/latest-sales';
import SalesBy from '../../components/statistic-page/components/sales-by';

const StatsPageContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.statsPageContainer}>
            <Grid container spacing={4}>
                <Grid item sm={12} md={3}>
                    <SalesBy />
                </Grid>
                <Grid item sm={12} md={9}>
                    <LatestSales />
                </Grid>
                <Grid item sm={12} md={12}>
                    <LatestOrders />
                </Grid>
            </Grid>
        </div>
    );
};

export default StatsPageContainer;
