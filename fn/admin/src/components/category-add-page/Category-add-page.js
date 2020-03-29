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
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
} from '../../actions';

const CategoryAddPage = props => {
    const classes = useStyles();

    const {
        adminService,
        setCategory,
        setCatalogs,
        catalogs,
        categoryUpdateCatalogs,
        categoryLoadingStatus,
        catalogsToUpdate,
        history,
        setSnackBarStatus,
        setSnackBarSeverity,
        setSnackBarMessage,
    } = props;

    const [categoryName, setCategoryName] = useState('');
    const { catalogsService, categoriesService } = adminService;

    useEffect(() => {
        categoryLoadingStatus();
        catalogsService.getAllCatalogs().then(res => setCatalogs(res));
        return () => {
            categoryUpdateCatalogs([]);
        };
    }, [categoryLoadingStatus, catalogsService, setCatalogs, setCategory, categoryUpdateCatalogs]);

    const categorySaveHandler = e => {
        e.preventDefault();
        categoryLoadingStatus();

        const newCategory = {
            category: categoryName,
        };
        categoriesService.postCategory(newCategory).then(res => {
            const newCategoryName = res.category;
            catalogsToUpdate.forEach(catalogToUpdate => {
                if (catalogToUpdate.checked) {
                    if (catalogToUpdate.catalog.categories) {
                        catalogToUpdate.catalog.categories.push(res._id);
                    }

                    catalogsService
                        .putCatalog(catalogToUpdate.catalog._id, catalogToUpdate.catalog)
                        .then(res => {
                            setSnackBarSeverity('success');
                            setSnackBarMessage(`Category ${newCategoryName} succesfully saved!`);
                            setSnackBarStatus(true);
                            history.push(`/categories`);
                        });
                }
            });
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
        </form>
    );
};
const mapStateToProps = ({
    catalogsState: { catalogs },
    categoriesState: { category, loading, catalogsToUpdate },
}) => ({
    catalogs,
    category,
    loading,
    catalogsToUpdate,
});
const mapDispatchToProps = {
    setCatalogs,
    setCategory,
    categoryLoadingStatus,
    categoryUpdateCatalogs,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryAddPage))
);
