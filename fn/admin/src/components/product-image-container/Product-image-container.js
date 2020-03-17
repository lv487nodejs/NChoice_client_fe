import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import { useStyles } from './Product-image-container-style';

const ProductImageContainer = ({ imageURL }) => {
    const classes = useStyles();

    return (
        <Grid item xs={4}>
            <Paper elevation={3} className={classes.paper}>
                <img src={imageURL} width="200px" alt="here is" />
            </Paper>
        </Grid>
    );
};

export default ProductImageContainer;
