import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { setCategories, categoryLoadingStatus } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { CATEGORIES_TABLE_HEAD } from '../../config';

const CategoryList = ({
    adminService,
    categories,
    setCategories,
    categoryLoadingStatus,
    loading,
    history,
}) => {
    useEffect(() => {
        categoryLoadingStatus();
        adminService.getAllCategories().then(res => setCategories(res));
    }, [adminService, setCategories, categoryLoadingStatus]);

    const categoryItems = categories.map((category, index) => (
        <TableContainerRow
            key={index}
            id={category.id}
            category={category.category}
            editHandler={() => {
                history.push(`/category/${category._id}`);
            }}
            deleteHandler={() => {
                console.log(category.id);
            }}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <TableContainerGenerator
            tableTitles={CATEGORIES_TABLE_HEAD}
            tableItems={categoryItems}
        />
    );
};

const mapStateToProps = ({ categoriesState: { categories, loading } }) => ({
    categories,
    loading,
});
const mapDispatchToProps = { setCategories, categoryLoadingStatus };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryList))
);
