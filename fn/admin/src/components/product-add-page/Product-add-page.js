import React, { useEffect, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import { useStyles } from './Product-add-page-style';
import wrapWithAdminService from '../wrappers';

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
import { NEW_PRODUCT_MODEL, NEW_PRODUCT_PROPETRIES, NEW_PRODUCT_DESCR } from '../../config';
import AddProductPropetries from '../product-add-item-propetries';

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

    const onSaveProduct = () => {
        adminService.postProduct(values).then(res => console.log(res));
    };

    const submitProp = () => {
        setValues({ ...values, propetries: [...values.propetries, newPropetry] });
        setPropetries(NEW_PRODUCT_PROPETRIES);
    };

    const productOptionGroups = [
        [catalogs, 'catalog'],
        [categories, 'category'],
        [brands, 'brand'],
        [colors, 'color'],
    ];

    const getOptions = (group, name) =>
        group.map(groupOption => (
            <option key={groupOption[name]} value={groupOption[name]}>
                {groupOption[name]}
            </option>
        ));

    const groupOptions = productOptionGroups.map(group => {
        const groupValue = group[0];
        const groupName = group[1];
        const options = getOptions(groupValue, groupName);
        return [groupName, options];
    });

    const productAddOptions = groupOptions.map(option => {
        const optionName = option[0];
        const optionValues = option[1];

        return (
            <ProductAddItemOptions
                classes={classes}
                optionValues={optionValues}
                optionName={optionName}
                onChangeEvent={handleInputChange}
                values={values}
            />
        );
    });

    const productAddDescriptions = NEW_PRODUCT_DESCR.map(option => (
        <ProductAddItemDescr
            classes={classes}
            option={option}
            values={values}
            onChangeEvent={handleInputChange}
        />
    ));
    console.log(values);
    return (
        <Paper className={classes.content}>
            {productAddOptions}
            {productAddDescriptions}
            <AddProductPropetries
                classes={classes}
                newPropetry={newPropetry}
                values={values}
                onChangeEvent={handlePropetriesInputChange}
                onSubmitEvent={submitProp}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={onSaveProduct}
            >
                SAVE PRODUCT
            </Button>
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
