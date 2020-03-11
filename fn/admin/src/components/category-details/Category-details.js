import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import {
    categoryLoadingStatus,
    setCategory,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
} from '../../actions';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';
import SnackbarItem from '../snackbar-item';

const CategoryDetails = props => {
    const {
        categoryId,
        setCategory,
        categoryLoadingStatus,
        open,
        categorySnackbarOpenTrue,
        categorySnackbarOpenFalse,
        category,
        loading,
        adminService,
    } = props;

    useEffect(() => {
        categoryLoadingStatus();
        adminService.getCategoryById(categoryId).then(res => setCategory(res));
    }, [
        setCategory,
        categoryLoadingStatus,
        categoryId,
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
                <Button color="primary" type="submit">
                    Submit
                </Button>
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

const mapStateToProps = ({ categoriesState: { category, loading, open } }) => ({
    category,
    loading,
    open,
});
const mapDispatchToProps = {
    categoryLoadingStatus,
    setCategory,
    categorySnackbarOpenTrue,
    categorySnackbarOpenFalse,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
);
