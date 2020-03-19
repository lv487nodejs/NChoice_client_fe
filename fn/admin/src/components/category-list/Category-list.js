import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import {
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
} from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { CATEGORIES_TABLE_HEAD } from '../../config';
import SnackbarItem from '../snackbar-item';

const CategoryList = ({
    adminService,
    categories,
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
    loading,
    open,
    history,
}) => {
    const { categoriesService } = adminService;

    useEffect(() => {
        categoryLoadingStatus();
        adminService.getAllCategories().then(res => setCategories(res));
    }, [
        adminService,
        setCategories,
        categoryLoadingStatus,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
    ]);

    const deleteHandler = id => async event => {
        try {
            const catalogs = await adminService.getAllCatalogs();

            catalogs.forEach(async catalog => {
                const categories = catalog.categories.filter(categori => categori._id !== id);
                catalog.categories = categories;
                await adminService.putCatalog(catalog._id, catalog);
            });

            await adminService.delteCategory(id);
            categorySnackbarOpenTrue();
            categoryLoadingStatus();
            const newCategories = await adminService.getAllCategories();
            setCategories(newCategories);
        } catch (error) {
            console.error(error);
        }
    };

    const closeSnackbarHandler = () => {
        categorySnackbarOpenFalse();
    };

    const categoryItems = categories.map((category, index) => (
        <TableContainerRow
            key={index}
            id={category.id}
            category={category.category}
            editHandler={() => {
                history.push(`/category/${category._id}`);
            }}
            deleteHandler={deleteHandler(category._id)}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <div>
            <TableContainerGenerator
                tableTitles={CATEGORIES_TABLE_HEAD}
                tableItems={categoryItems}
            />
            <SnackbarItem
                open={open}
                handleClose={closeSnackbarHandler}
                severity="success"
                message="Successefly created category!"
            />
        </div>
    );
};

const mapStateToProps = ({ categoriesState: { categories, loading, open } }) => ({
    categories,
    loading,
    open,
});
const mapDispatchToProps = {
    setCategories,
    categoryLoadingStatus,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryList))
);
