import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { useStyles } from './Product-add-page-style';
import wrapWithAdminService from '../wrappers';

import { setCatalogs, setCategories, setBrands, brandLoadingStatus, setColors } from '../../actions';
import LoadingBar from '../loading-bar';
import ProductAddOptions from '../product-add-page-options';
import ProductDescriptions from '../product-add-page-descr/Product-add-page-descr';
import { NEW_PRODUCT_MODEL, NEW_PRODUCT_DESCR } from '../../config';

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

    useEffect(() => {
        brandLoadingStatus();
        adminService.getAllCatalogs().then(res => setCatalogs(res));
        adminService.getAllCategories().then(res => setCategories(res));
        adminService.getAllColors().then(res => setColors(res));
        adminService.getAllBrands().then(res => setBrands(res));
    }, [adminService, setCatalogs, setCategories, setBrands, setColors, brandLoadingStatus]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
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
            <ProductAddOptions
                optionValues={optionValues}
                optionName={optionName}
                onChangeEvent={handleInputChange}
                values={values}
            />
        );
    });

    const productAddDescriptions = NEW_PRODUCT_DESCR.map(option => (
        <ProductDescriptions option={option} values={values} onChangeEvent={handleInputChange} />
    ));

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <Paper className={classes.content}>
            {productAddOptions}
            {productAddDescriptions}
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
