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
} from '../../actions';

import LoadingBar from '../loading-bar';
import ProductAddItemOptions from '../product-add-item-options';
import ProductAddItemDescr from '../product-add-item-descr';
import ProductAddPropetries from '../product-add-item-propetries';
import ProductAddPageStepper from '../product-add-page-stepper';
import ProductAddVerifyPage from '../product-add-verify-page';

import {
    NEW_PRODUCT_MODEL,
    NEW_PRODUCT_PROPETRIES,
    NEW_PRODUCT_DESCR,
    PRODUCT_ADD_STEPS_LABEL,
} from '../../config';

const ProductAddPage = ({
    adminService,
    loading,
    catalogs,
    categories,
    brands,
    colors,
    setCatalogs,
    setCategories,
    setBrands,
    brandLoadingStatus,
    setColors,
}) => {
    const classes = useStyles();
    const [values, setValues] = useState(NEW_PRODUCT_MODEL);
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
        setValues({ ...values, [name]: value });
    };

    const handlePropetriesInputChange = event => {
        const { name, value } = event.target;
        setPropetries({ ...newPropetry, [name]: value });
    };

    const onSavePropetry = () => {
        setValues({ ...values, propetries: [...values.propetries, newPropetry] });
        setPropetries(NEW_PRODUCT_PROPETRIES);
    };

    const onSaveProduct = () => {
        adminService.postProduct(values).then(res => console.log(res));
    };

    const productOptionGroups = [catalogs, categories, brands, colors];

    const productAddOptions = (
        <ProductAddItemOptions
            classes={classes}
            values={values}
            optionGroups={productOptionGroups}
            onChangeEvent={handleInputChange}
        />
    );

    const productAddDescriptions = NEW_PRODUCT_DESCR.map(option => (
        <ProductAddItemDescr
            key={option}
            classes={classes}
            option={option}
            values={values}
            onChangeEvent={handleInputChange}
        />
    ));

    const pruductAddPropetries = (
        <ProductAddPropetries
            classes={classes}
            newPropetry={newPropetry}
            values={values}
            onChangeEvent={handlePropetriesInputChange}
            onSubmitEvent={onSavePropetry}
        />
    );

    const productVerifyPage = <ProductAddVerifyPage product={values} />;

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
}) => ({
    brands,
    catalogs,
    categories,
    colors,
    loading,
});
const mapDispatchToProps = { setCatalogs, setCategories, setColors, setBrands, brandLoadingStatus };

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductAddPage));
