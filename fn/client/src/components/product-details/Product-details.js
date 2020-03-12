import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { productLoaded, productsLoaded, productsRequested, catalogLoaded } from '../../actions';
import withStoreService from '../hoc';
import './Product-details.css';
import ProductListPosts from '../product-list-posts';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    image: {
        height: 128,
    },
    mainImage: {
        width: 300,
        alignItems: 'center',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const ProductDetails = ({ id, product, productLoaded, productsLoaded, productsRequested, storeService, products, catalogLoaded, catalog }) => {
    const classes = useStyles();
    const [getColors, setColors] = useState([]);
    useEffect(() => {
        productsRequested();
        storeService.getProductById(id).then(res => productLoaded(res));
    }, [productsRequested, storeService, id, productLoaded]);

    useEffect(() => {
        storeService
            .getAllColors()
            .then(res => setColors(res))
    }, [storeService]);

    useEffect(() => {
        productsRequested();
        catalogLoaded(catalog);
        storeService.getAllProducts({ catalog: catalog }).then(res => productsLoaded(res));
    }, [productsLoaded, productsRequested, storeService, catalog, catalogLoaded]);


    const newProducts = products.slice(-9)

    const colorItem = getColors.filter(elem => elem._id === product.color).map(item => (
        <div key={id} style={{ backgroundColor: item.color }} className="productColor">
            {item.color}
        </div>
    ))

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`/images/products/${product.images}`} />
                        </ButtonBase>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`/images/products/${product.images}`} />
                        </ButtonBase>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={`/images/products/${product.images}`} />
                        </ButtonBase>

                    </Grid>
                    <Grid className="mainImageWrapper">
                        <ButtonBase>
                            <img className={classes.mainImage} alt="complex" src={`/images/products/${product.images}`} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container className='descriptionWrapper'>
                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" className="title">
                                    {product.title}
                                </Typography>

                                <Typography variant="body2" gutterBottom>
                                    {product.description}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">size</Typography>
                            <Typography variant="subtitle1" >{colorItem}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="buttonsGroup" >
                    <Button variant="contained" className="button">
                        Buy now
                    </Button>
                    <Button variant="contained" className="button">
                        Add to the cart
                    </Button>
                </Grid>
                <hr></hr>
                <ProductListPosts products={newProducts} />
            </Paper>
        </div>
    );
};

const mapStateToProps = ({ productsList: { product, products, loading } }) => ({ products, product, loading });
const mapDispatchToProps = { productLoaded, productsLoaded, productsRequested, catalogLoaded };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));
