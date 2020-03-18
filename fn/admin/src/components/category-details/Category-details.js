import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import { categoryLoadingStatus, setCategory } from '../../actions';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';
import SnackbarItem from '../snackbar-item';

const CategoryDetails = props => {
    const {
        categoryId,
        setCategory,
        categoryLoadingStatus,
        success,
        category,
        loading,
        adminService,
    } = props;
    const { categoriesService } = adminService;
    useEffect(() => {
        categoryLoadingStatus();
        categoriesService.getCategoryById(categoryId).then(res => setCategory(res));
    }, [setCategory, categoryLoadingStatus, categoryId, categoriesService]);

    const submitHandler = async e => {
        e.preventDefault();
        categoryLoadingStatus();
        const categoryToSend = {
            id: category._id,
            name: e.target.categoryName.value,
        };
        const res = await categoriesService.putCategory(categoryToSend);
        if (res.status === 200) {
            setCategory(res.data);
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

const mapStateToProps = ({ categoriesState: { category, loading } }) => ({
    category,
    loading,
});
const mapDispatchToProps = {
    categoryLoadingStatus,
    setCategory,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
);
