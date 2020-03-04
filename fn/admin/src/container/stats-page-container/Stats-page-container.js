import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './Stats-page-container-styles';

const StatsPageContainer = () => {
    const classes = useStyles();

    return <Typography className={classes.statsPageContainer}>StatsPageContainer</Typography>;
};

export default StatsPageContainer;
