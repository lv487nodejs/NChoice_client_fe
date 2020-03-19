import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    FormLabel,
    FormGroup,
} from '@material-ui/core';

import {
    categoryLoadingStatus,
    setCategory,
    setCatalogs,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
} from '../../actions';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';
import SnackbarItem from '../snackbar-item';
import { SaveButton } from '../buttons';

const CategoryDetails = props => {
    const {
        categoryId,
        setCategory,
        setCatalogs,
        catalogs,
        categoryLoadingStatus,
        open,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
        category,
        loading,
        adminService,
    } = props;

    const [catalogsToUpdate, setCatalogsToUpdate] = useState([]);

    useEffect(() => {
        categoryLoadingStatus();
        adminService.getCategoryById(categoryId).then(res => setCategory(res));
        adminService.getAllCatalogs().then(res => setCatalogs(res));
    }, [
        setCategory,
        categoryLoadingStatus,
        categoryId,
        setCatalogs,
        adminService,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
    ]);

    const closeSnackbarHandler = () => {
        categorySnackbarOpenFalse();
    };

    const submitHandler = async e => {
        e.preventDefault();
        categoryLoadingStatus();
        const categoryToSend = {
            id: category._id,
            name: e.target.categoryName.value,
        };

        adminService
            .putCategory(categoryToSend)
            .then(res => {
                setCategory(res);
                categorySnackbarOpenTrue();
            })
            .catch(err => categorySnackbarOpenFalse());
    };

    const handleCheck = catalog => event => {
        setCatalogsToUpdate([...catalogsToUpdate, catalog]);
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

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <TextField
                    id="categoryName"
                    label="Category Name"
                    defaultValue={category.category}
                />
                <FormLabel component="legend">Choose catalogs for this category</FormLabel>
                <FormGroup row>{checkboxes}</FormGroup>
                <SaveButton type="submit" title="Save" />
            </form>
            <SnackbarItem
                open={open}
                handleClose={closeSnackbarHandler}
                severity="success"
                message="Successefly update category!"
            />
        </div>
    );
};

const mapStateToProps = ({
    categoriesState: { category, loading, open },
    catalogsState: { catalogs },
}) => ({
    category,
    loading,
    open,
    catalogs,
});
const mapDispatchToProps = {
    categoryLoadingStatus,
    setCategory,
    setCatalogs,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
);
