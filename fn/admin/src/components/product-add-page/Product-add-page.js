import React from 'react';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-add-page-style';

import {
    setProductEdit,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
} from '../../actions';

import ProductAddItemOptions from '../product-add-item-options';
import ProductAddItemDescr from '../product-add-item-descr';
import ProductAddPropetries from '../product-add-item-propetries';
import ProductAddPageStepper from '../product-add-page-stepper';
import ProductAddVerifyPage from '../product-add-verify-page';

import { NEW_PRODUCT_DESCR } from '../../config';

const successMessage = 'Product succesfully saved id:';

const ProductAddPage = ({
    history,
    adminService,
    productEdit,
    setProductEdit,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
}) => {
    const classes = useStyles();
    const { productsService } = adminService;

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProductEdit({ ...productEdit, [name]: value });
    };

    const handleSaveProduct = async event => {
        event.preventDefault();
        const productId = await productsService.postProduct(productEdit).then(res => {
            setSnackBarSeverity('success');
            setSnackBarMessage(`${successMessage} ${res._id}`);
            setSnackBarStatus(true);
            return res._id;
        });
        history.push(`/product/${productId}`);
    };

    const productAddOptions = (
        <ProductAddItemOptions classes={classes} onChangeEvent={handleInputChange} />
    );

    const productAddDescriptions = NEW_PRODUCT_DESCR.map(option => (
        <ProductAddItemDescr
            key={option}
            classes={classes}
            option={option}
            onChangeEvent={handleInputChange}
        />
    ));

    const pruductAddPropetries = <ProductAddPropetries />;

    const productVerifyPage = <ProductAddVerifyPage product={productEdit} />;

    const stepperSteps = [
        productAddOptions,
        productAddDescriptions,
        pruductAddPropetries,
        productVerifyPage,
    ];

    return (
        <Paper className={classes.content}>
            <ProductAddPageStepper steps={stepperSteps} onSaveHandler={handleSaveProduct} />
        </Paper>
    );
};

const mapStateToProps = ({ productEditState: { productEdit } }) => ({
    productEdit,
});
const mapDispatchToProps = {
    setProductEdit,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductAddPage))
);
