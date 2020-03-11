import React, { useEffect, useState } from 'react';
import { TextField, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { useStyles } from './Add-product-page-style';
import wrapWithAdminService from '../wrappers';

import { setCatalogs, setCategories, setBrands, brandLoadingStatus, setColors } from '../../actions';
import LoadingBar from '../loading-bar';

const AddProductPage = ({
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
    const [values, setValues] = useState({ catalog: '', category: '', brand: '' });

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

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const catalogOptions = catalogs.map(option => (
        <option key={option.catalog} value={option.catalog}>
            {option.catalog}
        </option>
    ));

    const categoryOptions = categories.map(option => (
        <option key={option.category} value={option.category}>
            {option.category}
        </option>
    ));

    const brandOptions = brands.map(option => (
        <option key={option.brand} value={option.brand}>
            {option.brand}
        </option>
    ));

    const colorOptions = colors.map(option => (
        <option key={option.color} value={option.color}>
            {option.color}
        </option>
    ));

    return (
        <Paper className={classes.content}>
            <TextField
                id="outlined-select-currency-native"
                select
                className={classes.textfield}
                name="catalog"
                label="Choose Catalog"
                value={values.catalog}
                onChange={handleInputChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select Catalog"
                variant="outlined"
            >
                {catalogOptions}
            </TextField>
            <TextField
                id="outlined-select-currency-native"
                select
                className={classes.textfield}
                name="category"
                label="Choose Category"
                value={values.category}
                onChange={handleInputChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select Category"
                variant="outlined"
            >
                {categoryOptions}
            </TextField>
            <TextField
                id="outlined-select-currency-native"
                select
                className={classes.textfield}
                name="brand"
                label="Choose Brand"
                value={values.brand}
                onChange={handleInputChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select Brand"
                variant="outlined"
            >
                {brandOptions}
            </TextField>
            <TextField
                id="outlined-select-currency-native"
                select
                className={classes.textfield}
                name="color"
                label="Choose Color"
                value={values.color}
                onChange={handleInputChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select Color"
                variant="outlined"
            >
                {colorOptions}
            </TextField>
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

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(AddProductPage));
