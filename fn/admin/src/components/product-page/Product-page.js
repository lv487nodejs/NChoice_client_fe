import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';

import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-page-style';
import ProductPropetriesPage from '../product-propetries-container';
import ProductContainerDetails from '../product-details-container/Product-container-details';

import {
    setProduct,
    setProductLoadingStatus,
    setProductPropetries,
    setProductsReadOnly,
} from '../../actions';

import LoadingBar from '../loading-bar';
import ProductImageContainer from '../product-image-container';
import { StandardButton } from '../buttons';

const IMG_URL = 'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';
const EDIT_BUTTON_TITLE = 'EDIT PRODUCT';
const SAVE_BUTTON_TITLE = 'SAVE PRODUCT';

const ProductPage = ({
    adminService,
    product,
    productPropetries,
    setProduct,
    setProductLoadingStatus,
    setProductPropetries,
    setProductsReadOnly,
    readOnly,
    loading,
    id,
}) => {
    const classes = useStyles();

    const { productsService } = adminService;

    useEffect(() => {
        setProductLoadingStatus();
        productsService.getProductById(id).then(res => setProduct(res));
        productsService.getProductPropetries(id).then(res => setProductPropetries(res));
    }, [id, productsService, setProduct, setProductLoadingStatus, setProductPropetries]);

    if (loading) {
        return <LoadingBar />;
    }

    const productPropetriesPages = productPropetries.map(propetry => (
        <Grid item sm={12} md={4}>
            <ProductPropetriesPage key={propetry.size} propetries={propetry} />
        </Grid>
    ));

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleEditStatus = () => {
        setProductsReadOnly(false);
    };

    const handleSaveProduct = () => {
        setProductsReadOnly(true);
    };

    const productDetails = (
        <ProductContainerDetails
            key={id}
            catalog={product.catalog}
            category={product.category}
            brand={product.brand}
            title={product.title}
            color={product.color}
            price={product.price}
            msrp={product.msrp}
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
                        <StandardButton eventHandler={handleEditStatus} title={EDIT_BUTTON_TITLE} />
                        <StandardButton
                            eventHandler={handleSaveProduct}
                            title={SAVE_BUTTON_TITLE}
                            disabled={readOnly}
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

const mapStateToProps = ({ productsState: { product, productPropetries, readOnly, loading } }) => ({
    product,
    productPropetries,
    readOnly,
    loading,
});
const mapDispatchToProps = {
    setProduct,
    setProductPropetries,
    setProductLoadingStatus,
    setProductsReadOnly,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
