import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { categoriesLoaded, categoriesRequested } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { CATEGORIES_TABLE_HEAD } from '../../config';

const CategoryList = ({
    adminService,
    categories,
    categoriesLoaded,
    categoriesRequested,
    loading,
    history,
}) => {
    useEffect(() => {
        categoriesRequested();
        adminService.getAllCategories().then(res => categoriesLoaded(res));
    }, [adminService, categoriesLoaded, categoriesRequested]);

    const categoryItems = categories.map((category, index) => (
        <TableContainerRow
            key={index}
            id={category.id}
            category={category.category}
            editHandler={() => {
                history.push(`/category/${category.id}`);
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

const mapStateToProps = ({ categoriesList: { categories, loading } }) => ({
    categories,
    loading,
});
const mapDispatchToProps = { categoriesLoaded, categoriesRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryList))
);
