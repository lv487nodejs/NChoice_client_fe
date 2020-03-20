import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Paper,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormLabel,
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
        history,
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
            catalogsToUpdate.forEach(checkbox => {
                if (checkbox.checked) {
                    if (checkbox.catalog.categories) {
                        checkbox.catalog.categories.push(res._id);
                    }

                    catalogsService.putCatalog(checkbox.catalog._id, checkbox.catalog).then(res => {
                        categorySnackbarOpenTrue();
                        setCategoryName('');
                    });
                }
            });

            history.push(`/categories`);
        });
    };

    const catalogsToUpdateHandler = catalog => e => {
        const index = catalogsToUpdate.findIndex(element => element.catalog._id === catalog._id);
        const catalogToUpdate = {
            catalog,
            checked: e.target.checked,
        };
        if (index > -1) {
            catalogsToUpdate[index] = catalogToUpdate;
        } else {
            categoryUpdateCatalogs([...catalogsToUpdate, catalogToUpdate]);
        }
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
                className={classes.checkbox}
                key={catalogName}
                control={
                    <Checkbox
                        key={catalogName}
                        id={catalogName}
                        color="primary"
                        value={catalogName}
                        onChange={catalogsToUpdateHandler(catalog)}
                    />
                }
                label={catalogName.toUpperCase()}
            />
        );
    });

    return (
        <form onSubmit={categorySaveHandler}>
            <Paper className={classes.categoryAdd}>
                <TextField
                    id="categoryName"
                    className={classes.textfield}
                    variant="outlined"
                    label="Category name"
                    value={categoryName}
                    onChange={categoryNameHandler}
                    required
                />
                <FormLabel className={classes.formLable} component="legend">
                    Choose catalogs for this category
                </FormLabel>
                <FormGroup row>{checkboxes}</FormGroup>
                <SaveButton className={classes.button} type="submit" title="Save" />
            </Paper>
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
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryAddPage))
);
