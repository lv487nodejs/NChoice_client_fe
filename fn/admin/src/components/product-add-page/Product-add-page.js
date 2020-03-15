import React from 'react';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-add-page-style';

import { setNewProduct } from '../../actions';

import ProductAddItemOptions from '../product-add-item-options';
import ProductAddItemDescr from '../product-add-item-descr';
import ProductAddPropetries from '../product-add-item-propetries';
import ProductAddPageStepper from '../product-add-page-stepper';
import ProductAddVerifyPage from '../product-add-verify-page';

import { NEW_PRODUCT_DESCR } from '../../config';
import SnackbarItem from '../snackbar-item/Snackbar-item';

const successMessage = 'Product succesfully saved id:';

const ProductAddPage = ({ adminService, newProduct, setNewProduct }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSaveProduct = event => {
        event.preventDefault();
        adminService.postProduct(newProduct).then(res => {
            setOpen(true);
            setMsg(`${successMessage} ${res._id}`);
        });
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

    const pruductAddPropetries = <ProductAddPropetries classes={classes} />;

    const productVerifyPage = <ProductAddVerifyPage product={newProduct} />;

    const stepperSteps = [
        productAddOptions,
        productAddDescriptions,
        pruductAddPropetries,
        productVerifyPage,
    ];

    return (
        <Paper className={classes.content}>
            <ProductAddPageStepper steps={stepperSteps} onSaveHandler={handleSaveProduct} />
            <SnackbarItem open={open} msg={msg} />
        </Paper>
    );
};

const mapStateToProps = ({ productsState: { newProduct } }) => ({
    newProduct,
});
const mapDispatchToProps = {
    setNewProduct,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductAddPage));
