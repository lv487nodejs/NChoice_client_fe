import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';

import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-page-style';
import ProductPropetriesPage from '../product-propetries-container';
import ProductContainerDetails from '../product-details-container/Product-container-details';

import {
    setProduct,
    setProductEdit,
    setProductLoadingStatus,
    setProductPropetries,
    setProductEditStatus,
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
} from '../../actions';

import LoadingBar from '../loading-bar';
import ProductImageContainer from '../product-image-container';
import { StandardButton } from '../buttons';
import { NEW_PRODUCT_MODEL } from '../../config';

const SUCCESS_STATUS = 'success';

const IMG_URL = 'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';
const EDIT_BUTTON_TITLE = 'EDIT PRODUCT';
const SAVE_BUTTON_TITLE = 'SAVE';
const DISCARD_BUTTON_TITLE = 'DISCARD';

const ProductPage = ({
    adminService,
    product,
    productEdit,
    setProductEdit,
    productPropetries,
    setProduct,
    setProductLoadingStatus,
    setProductPropetries,
    setProductEditStatus,
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    productEditStatus,
    loading,
    id,
}) => {
    const classes = useStyles();

    const { productsService } = adminService;

    useEffect(() => {
        setProductLoadingStatus();
        productsService.getProductById(id).then(res => {
            setProduct(res);
        });
        productsService.getProductPropetries(id).then(res => setProductPropetries(res));
        return () => {
            setProductEdit(NEW_PRODUCT_MODEL);
            setProduct({});
        };
    }, [
        id,
        productsService,
        setProduct,
        setProductEdit,
        setProductLoadingStatus,
        setProductPropetries,
    ]);

    if (loading) {
        return <LoadingBar />;
    }

    const productPropetriesPages = productPropetries.map(propetry => (
        <Grid key={propetry.size} item sm={12} md={4}>
            <ProductPropetriesPage propetries={propetry} />
        </Grid>
    ));

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSnackBarOpen = (message, severity) => {
        setSnackBarMessage(message);
        setSnackBarSeverity(severity);
        setSnackBarStatus(true);
    };

    const handleDialogOpen = (title, content, button, eventhandler) => {
        setDialogStatus(true);
        setDialogTitle(title);
        setDialogContent(content);
        setButtonTitle(button);
        setEventHandler(eventhandler);
    };

    const handleEditStatus = () => {
        setProductEdit(product);
        setProductEditStatus(false);
    };

    const saveChanges = async () => {
        const res = await productsService.putProduct(id, product);
        setProductEditStatus(true);
        setDialogStatus(false);
        const prodId = res[0].id;
        handleSnackBarOpen(`Changes to product ${prodId} has been saved!`, SUCCESS_STATUS);
    };

    const discardChanges = () => {
        setProduct(productEdit);
        setProductEditStatus(true);
        setDialogStatus(false);
    };

    const handleDiscardChanges = () => {
        handleDialogOpen(
            'Discard Changes',
            'Are you sure you want to discard changes?',
            DISCARD_BUTTON_TITLE,
            discardChanges
        );
    };

    const handleSaveChanges = () => {
        handleDialogOpen(
            'Save Changes',
            'Are you sure you want to save changes to product?',
            SAVE_BUTTON_TITLE,
            saveChanges
        );
    };

    const editProductButton = (
        <StandardButton eventHandler={handleEditStatus} title={EDIT_BUTTON_TITLE} />
    );

    const discardChangesButton = (
        <StandardButton eventHandler={handleDiscardChanges} title={DISCARD_BUTTON_TITLE} />
    );

    const editDiscardButton = productEditStatus ? editProductButton : discardChangesButton;

    const productDetails = (
        <ProductContainerDetails
            key={id}
            catalog={product.catalog}
            category={product.category}
            brand={product.brand}
            title={product.title}
            color={product.color}
            price={product.price}
            mrsp={product.mrsp}
            description={product.description}
            handleInputChange={handleInputChange}
        />
    );

    return (
        <Grid container spacing={2} className={classes.content}>
            <Grid container item sm={12} md={5}>
                <Paper elevation={3} className={classes.gridContainer}>
                    <ProductImageContainer imageURL={IMG_URL} />
                    <div className={classes.buttons}>
                        {editDiscardButton}
                        <StandardButton
                            eventHandler={handleSaveChanges}
                            title={SAVE_BUTTON_TITLE}
                            disabled={productEditStatus}
                        />
                    </div>
                </Paper>
            </Grid>
            <Grid item sm={12} md={7}>
                <Paper elevation={3} className={classes.gridContainer}>
                    {productDetails}
                </Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper elevation={3} className={classes.gridContainer}>
                    <Grid container spacing={2}>
                        {productPropetriesPages}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = ({
    productsState: { product, productPropetries, productEditStatus, loading },
    productEditState: { productEdit },
}) => ({
    product,
    productEdit,
    productPropetries,
    productEditStatus,
    loading,
});
const mapDispatchToProps = {
    setProduct,
    setProductEdit,
    setProductPropetries,
    setProductLoadingStatus,
    setProductEditStatus,
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
