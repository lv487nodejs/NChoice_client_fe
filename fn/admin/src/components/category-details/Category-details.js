import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    TextField,
    FormControlLabel,
    Checkbox,
    FormLabel,
    FormGroup,
    Paper,
} from '@material-ui/core';

import {
    categoryLoadingStatus,
    setCategory,
    categorySnackbarOpenTrue,
    categoryUpdateCatalogs,
    categorySnackbarOpenFalse,
} from '../../actions';
import { useStyles } from './Category-details-style';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';
import SnackbarItem from '../snackbar-item';
import { SaveButton } from '../buttons';

const CategoryDetails = props => {
    const {
        categoryId,
        setCategory,
        categoryUpdateCatalogs,
        catalogsToUpdate,
        categoryLoadingStatus,
        open,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
        category,
        loading,
        adminService,
        history,
    } = props;

    const { categoriesService, catalogsService } = adminService;

    const classes = useStyles();

    useEffect(() => {
        categoryLoadingStatus();
        categoriesService.getCategoryById(categoryId).then(resCategory => {
            setCategory(resCategory);
            catalogsService.getAllCatalogs().then(resCatalog => {
                const newCatalogs = resCatalog.map(catalog => {
                    const categoryName = resCategory.category;

                    const index = catalog.categories.findIndex(
                        element => element.category === categoryName
                    );

                    if (index > -1) {
                        catalog.checked = true;
                        return catalog;
                    }
                    catalog.checked = false;
                    return catalog;
                });
                categoryUpdateCatalogs(newCatalogs);
            });
        });
    }, [
        setCategory,
        categoryLoadingStatus,
        categoryId,
        categoriesService,
        catalogsService,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
        categoryUpdateCatalogs,
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
        categoriesService
            .putCategory(categoryToSend)
            .then(res => {
                setCategory(res);

                catalogsToUpdate.forEach(async catalog => {
                    const index = catalog.categories.findIndex(
                        categoryItem => categoryItem._id === res._id
                    );

                    if (index > -1 && !catalog.checked) {
                        catalog.categories.splice(index, 1);
                    }
                    if (index === -1 && catalog.checked) {
                        catalog.categories.push({ _id: res._id });
                    }
                    catalogsService
                        .putCatalog(catalog._id, catalog)
                        .then(res => categorySnackbarOpenTrue());
                });
                history.push(`/categories`);
            })
            .catch(err => categorySnackbarOpenFalse());
    };

    const catalogsToUpdateHandler = catalogCheckbox => e => {
        const index = catalogsToUpdate.findIndex(element => element._id === catalogCheckbox._id);

        const catalogToUpdate = {
            ...catalogCheckbox,
            checked: e.target.checked,
        };
        const newCatalogsToUpdate = [...catalogsToUpdate];
        if (index > -1) {
            newCatalogsToUpdate[index] = catalogToUpdate;
        }
        categoryUpdateCatalogs(newCatalogsToUpdate);
    };

    const checkboxes = catalogsToUpdate.map(catalog => {
        const catalogName = catalog.catalog;
        console.log(catalogName);

        return (
            <FormControlLabel
                key={catalogName}
                control={
                    <Checkbox
                        key={catalogName}
                        id={catalogName}
                        className={classes.checkbox}
                        color="primary"
                        checked={catalog.checked}
                        value={catalogName}
                        onChange={catalogsToUpdateHandler(catalog)}
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
                <Paper className={classes.categoryEdit}>
                    <TextField
                        id="categoryName"
                        className={classes.textfield}
                        variant="outlined"
                        label="Category Name"
                        defaultValue={category.category}
                    />
                    <FormLabel className={classes.formLable} component="legend">
                        Choose catalogs for this category
                    </FormLabel>
                    <FormGroup row>{checkboxes}</FormGroup>
                    <SaveButton type="submit" title="Save" />
                </Paper>
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

const mapStateToProps = ({ categoriesState: { category, loading, open, catalogsToUpdate } }) => ({
    category,
    loading,
    open,
    catalogsToUpdate,
});
const mapDispatchToProps = {
    categoryLoadingStatus,
    setCategory,
    categoryUpdateCatalogs,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetails))
);
