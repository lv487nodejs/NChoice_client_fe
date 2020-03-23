import React from 'react';
import { connect } from 'react-redux';

import { Typography, Paper } from '@material-ui/core';

import { PRODUCT_KEYS, PROPETRIES_KEYS } from '../../config';
import { useStyles } from './Product-add-verify-page-style';

const ProductAddVerifyPage = ({ productEdit }) => {
    const classes = useStyles();

    const productValues = PRODUCT_KEYS.map(key => (
        <Typography
            className={classes.propsText}
            key={key}
        >{`${key}: ${productEdit[key]}`}</Typography>
    ));

    const productPropetries = productEdit.propetries.map(item => (
        <div key={item.size} className={classes.product}>
            {PROPETRIES_KEYS.map(key => (
                <Typography
                    className={classes.propsText}
                    key={item[key]}
                >{`${key}: ${item[key]}`}</Typography>
            ))}
        </div>
    ));

    return (
        <Paper className={classes.product}>
            {productValues}
            <div className={classes.props}>{productPropetries}</div>
        </Paper>
    );
};

const mapStateToProps = ({ productEditState: { productEdit } }) => ({
    productEdit,
});

export default connect(mapStateToProps)(ProductAddVerifyPage);
