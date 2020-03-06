import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { useStyles } from './Product-page-style';
import ProductPropetriesPage from '../product-propetries-container';
import ProductContainerDetails from '../product-details-container/Product-container-details';

import wrapWithAdminService from '../wrappers';
import {
    setProduct,
    productLoadingStatus,
    setProductPropetries,
} from '../../actions';
import LoadingBar from '../loading-bar';

const ProductPage = ({
    adminService,
    product,
    productPropetries,
    setProduct,
    productLoadingStatus,
    setProductPropetries,
    loading,
    match,
}) => {
    const classes = useStyles();
    const { id } = match.params;

    useEffect(() => {
        productLoadingStatus();
        adminService.getProductById(id).then(res => setProduct(res));
        adminService
            .getProductPropetries(id)
            .then(res => setProductPropetries(res));
    }, [
        id,
        adminService,
        setProduct,
        productLoadingStatus,
        setProductPropetries,
    ]);

    const photo =
        'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';

    const productPropetriesPages = productPropetries.map(propetry => (
        <ProductPropetriesPage propetries={propetry} />
    ));

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
        <Grid
            container
            spacing={3}
            className={classes.content}
            alignItems="center"
        >
            <Grid item xs={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={8}>
                            <img
                                className={classes.img}
                                src={photo}
                                width="200px"
                                alt="here is"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs>
                                <img
                                    className={classes.img}
                                    src={photo}
                                    alt="here is"
                                />
                            </Grid>
                            <Grid item xs>
                                <img
                                    className={classes.img}
                                    src={photo}
                                    alt="here is"
                                />
                            </Grid>
                            <Grid item xs>
                                <img
                                    className={classes.img}
                                    src={photo}
                                    alt="here is"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {productDetails}
            {productPropetriesPages}
        </Grid>
    );
};

const mapStateToProps = ({
    productsState: { product, productPropetries, loading },
}) => ({
    product,
    productPropetries,
    loading,
});
const mapDispatchToProps = {
    setProduct,
    setProductPropetries,
    productLoadingStatus,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
