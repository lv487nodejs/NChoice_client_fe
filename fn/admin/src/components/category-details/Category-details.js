import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import { categoriesStartLoading, categorySet, successSet } from '../../actions';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';
import SnackbarItem from '../snackbar-item';

const CategoryDetails = props => {
    const {
        categoryId,
        categorySet,
        categoriesStartLoading,
        successSet,
        success,
        category,
        loading,
        adminService,
    } = props;

    useEffect(() => {
        categoriesStartLoading();
        successSet(success);
        adminService.getCategoryById(categoryId).then(res => categorySet(res));
    }, [
        categorySet,
        categoriesStartLoading,
        categoryId,
        adminService,
        successSet,
    ]);

    const submitHandler = async e => {
        e.preventDefault();
        categoriesStartLoading();
        const categoryToSend = {
            id: category._id,
            name: e.target.categoryName.value,
        };
        const res = await adminService.putCategory(categoryToSend);
        if (res.status === 200) {
            categorySet(res.data);
            successSet(success);
            return <SnackbarItem open={success} />;
        }
    };
    if (loading) {
        return <LoadingBar />;
    }

    return (
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
    );
};

const mapStateToProps = ({
    categoriesList: { category, loading, success },
}) => ({
    category,
    loading,
    success,
});
const mapDispatchToProps = {
    categoriesStartLoading,
    categorySet,
    successSet,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
);
