import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './Products-page-container-styles';

const ProductsPageContainer = () => {
    const classes = useStyles();

    return <Typography className={classes.productsPageContainer}>ProductsPageContainer</Typography>;
};

export default ProductsPageContainer;
