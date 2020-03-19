import React, { useEffect, useState } from 'react';

import {
    Paper,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useStyles } from './Category-add-page-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
    setCatalogs,
    setCategory,
    categoryUpdateCatalogs,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
} from '../../actions';
import SnackbarItem from '../snackbar-item';

const CategoryAddPage = props => {
    const classes = useStyles();

    const {
        adminService,
        setCategory,
        setCatalogs,
        catalogs,
        categoryUpdateCatalogs,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
        categoryLoadingStatus,
        open,
        catalogsToUpdate,
    } = props;

    const [categoryName, setCategoryName] = useState('');
    const { catalogsService, categoriesService } = adminService;

    useEffect(() => {
        categoryLoadingStatus();
        catalogsService.getAllCatalogs().then(res => setCatalogs(res));
    }, [
        categoryLoadingStatus,
        catalogsService,
        setCatalogs,
        setCategory,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
        categoryUpdateCatalogs,
    ]);

    const categorySaveHandler = e => {
        e.preventDefault();
        categoryLoadingStatus();

        const newCategory = {
            category: categoryName,
        };
        categoriesService.postCategory(newCategory).then(res => {
            catalogsToUpdate.forEach(catalog => {
                catalog.categories.push(res._id);
                catalogsService.putCatalog(catalog._id, catalog).then(res => {
                    categorySnackbarOpenTrue();
                    setCategoryName('');
                });
            });
        });
    };

    const handleCheck = catalog => () => {
        categoryUpdateCatalogs([...catalogsToUpdate, catalog]);
    };

    const closeSnackbarHandler = () => {
        categorySnackbarOpenFalse();
    };

    const categoryNameHandler = e => {
        setCategoryName(e.target.value);
    };

    const checkboxes = catalogs.map(catalog => {
        const catalogName = catalog.catalog;
        return (
            <FormControlLabel
                key={catalogName}
                control={
                    <Checkbox
                        key={catalogName}
                        id={catalogName}
                        color="primary"
                        value={catalogName}
                        onChange={handleCheck(catalog)}
                    />
                }
                label={catalogName.toUpperCase()}
            />
        );
    });

    return (
        <form onSubmit={categorySaveHandler}>
            <FormControl>
                <Paper className={classes.content}>
                    <TextField
                        id="categoryName"
                        className={classes.textfield}
                        variant="outlined"
                        label="Category name"
                        value={categoryName}
                        onChange={categoryNameHandler}
                        required
                    />
                    <FormLabel component="legend">Choose catalogs for this category</FormLabel>
                    <FormGroup row>{checkboxes}</FormGroup>
                    <SaveButton type="submit" title="Save" />
                </Paper>
            </FormControl>
            <SnackbarItem
                open={open}
                handleClose={closeSnackbarHandler}
                severity="success"
                message="Successefly created category!"
            />
        </form>
    );
};
const mapStateToProps = ({
    catalogsState: { catalogs },
    categoriesState: { category, loading, catalogsToUpdate, open },
}) => ({
    catalogs,
    category,
    loading,
    catalogsToUpdate,
    open,
});
const mapDispatchToProps = {
    setCatalogs,
    setCategory,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
    categoryUpdateCatalogs,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(CategoryAddPage)
);
