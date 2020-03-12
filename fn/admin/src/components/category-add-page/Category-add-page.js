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
import LoadingBar from '../loading-bar';

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
        loading,
    } = props;

    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        categoryLoadingStatus();
        adminService.getAllCatalogs().then(res => setCatalogs(res));
    }, [
        categoryLoadingStatus,
        adminService,
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
        adminService.postCategory(newCategory).then(res => {
            catalogsToUpdate.forEach(catalogId => {
                const catalogCategoryToSave = {
                    categories: [res._id],
                };

                adminService.putCatalog(catalogId, catalogCategoryToSave).then(res => {
                    categorySnackbarOpenTrue();
                    setCategoryName('');
                });
            });
        });
    };

    const handleCheck = id => event => {
        categoryUpdateCatalogs([...catalogsToUpdate, id]);
    };

    const closeSnackbarHandler = () => {
        categorySnackbarOpenFalse();
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
                        onChange={handleCheck(catalog._id)}
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
                        onChange={e => setCategoryName(e.target.value)}
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
