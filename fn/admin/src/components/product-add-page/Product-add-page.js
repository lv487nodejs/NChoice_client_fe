import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-add-page-style';

import {
    setCatalogs,
    setCategories,
    setBrands,
    brandLoadingStatus,
    setColors,
    setNewProduct,
} from '../../actions';

import LoadingBar from '../loading-bar';
import ProductAddItemOptions from '../product-add-item-options';
import ProductAddItemDescr from '../product-add-item-descr';
import ProductAddPropetries from '../product-add-item-propetries';
import ProductAddPageStepper from '../product-add-page-stepper';
import ProductAddVerifyPage from '../product-add-verify-page';

import {
    NEW_PRODUCT_PROPETRIES,
    NEW_PRODUCT_DESCR,
    PRODUCT_ADD_STEPS_LABEL,
} from '../../config';

const ProductAddPage = ({
    adminService,
    loading,
    newProduct,
    catalogs,
    categories,
    brands,
    colors,
    setCatalogs,
    setCategories,
    setBrands,
    setNewProduct,
    brandLoadingStatus,
    setColors,
}) => {
    const classes = useStyles();
    const [newPropetry, setPropetries] = useState(NEW_PRODUCT_PROPETRIES);

    useEffect(() => {
        brandLoadingStatus();
        adminService.getAllCatalogs().then(res => setCatalogs(res));
        adminService.getAllCategories().then(res => setCategories(res));
        adminService.getAllColors().then(res => setColors(res));
        adminService.getAllBrands().then(res => setBrands(res));
    }, [adminService, setCatalogs, setCategories, setBrands, setColors, brandLoadingStatus]);

    if (loading) {
        return <LoadingBar />;
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handlePropetriesInputChange = event => {
        const { name, value } = event.target;
        setPropetries({ ...newPropetry, [name]: value });
    };

    const onSavePropetry = () => {
        setNewProduct({ ...newProduct, propetries: [...newProduct.propetries, newPropetry] });
    };

    const onSaveProduct = event => {
        event.preventDefault();
        adminService.postProduct(newProduct).then(res => console.log(res));
    };

    const productOptionGroups = [catalogs, categories, brands, colors];

    const productAddOptions = (
        <ProductAddItemOptions
            classes={classes}
            values={newProduct}
            optionGroups={productOptionGroups}
            onChangeEvent={handleInputChange}
        />
    );

    const productAddDescriptions = NEW_PRODUCT_DESCR.map(option => (
        <ProductAddItemDescr
            key={option}
            classes={classes}
            option={option}
            values={newProduct}
            onChangeEvent={handleInputChange}
        />
    ));

    const pruductAddPropetries = (
        <ProductAddPropetries
            classes={classes}
            newPropetry={newPropetry}
            values={newProduct}
            onChangeEvent={handlePropetriesInputChange}
            onSubmitEvent={onSavePropetry}
        />
    );

    const productVerifyPage = <ProductAddVerifyPage product={newProduct} />;

    const stepperSteps = [
        productAddOptions,
        productAddDescriptions,
        pruductAddPropetries,
        productVerifyPage,
    ];

    return (
        <Paper className={classes.content}>
            <ProductAddPageStepper
                steps={stepperSteps}
                labels={PRODUCT_ADD_STEPS_LABEL}
                onSaveHandler={onSaveProduct}
            />
        </Paper>
    );
};

const mapStateToProps = ({
    catalogsState: { catalogs },
    categoriesState: { categories },
    brandsState: { brands, loading },
    colorsState: { colors },
    newProductState: { newProduct },
}) => ({
    newProduct,
    brands,
    catalogs,
    categories,
    colors,
    loading,
});
const mapDispatchToProps = { setCatalogs, setCategories, setColors, setBrands, setNewProduct, brandLoadingStatus };

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductAddPage));
