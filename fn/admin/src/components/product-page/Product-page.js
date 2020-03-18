import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-page-style';
import ProductPropetriesPage from '../product-propetries-container';
import ProductContainerDetails from '../product-details-container/Product-container-details';

import { setProduct, setProductLoadingStatus, setProductPropetries } from '../../actions';

import LoadingBar from '../loading-bar';
import ProductImageContainer from '../product-image-container';

const ProductPage = ({
    adminService,
    product,
    productPropetries,
    setProduct,
    setProductLoadingStatus,
    setProductPropetries,
    loading,
    match,
}) => {
    const classes = useStyles();
    const { id } = match.params;
    const { productsService } = adminService;
    useEffect(() => {
        setProductLoadingStatus();
        productsService.getProductById(id).then(res => setProduct(res));
        productsService.getProductPropetries(id).then(res => setProductPropetries(res));
    }, [id, productsService, setProduct, setProductLoadingStatus, setProductPropetries]);

    const photo = 'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';

    const productPropetriesPages = productPropetries.map(propetry => <ProductPropetriesPage propetries={propetry} />);

    const productDetails = (
        <ProductContainerDetails
            catalog={product.catalog}
            category={product.category}
            brand={product.brand}
            title={product.title}
            color={product.color}
            price={product.price}
            msrp={product.msrp}
            description={product.description}
        />
    );

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <Grid container spacing={3} className={classes.content} alignItems="center">
            <ProductImageContainer imageURL={photo} />
            {productDetails}
            {productPropetriesPages}
        </Grid>
    );
};

const mapStateToProps = ({ productsState: { product, productPropetries, loading } }) => ({
    product,
    productPropetries,
    loading,
});
const mapDispatchToProps = {
    setProduct,
    setProductPropetries,
    setProductLoadingStatus,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
