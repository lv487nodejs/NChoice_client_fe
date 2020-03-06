import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { brandsLoaded, brandsRequested } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { BRANDS_TABLE_HEAD } from '../../config';

const BrandList = ({
    adminService,
    brands,
    brandsLoaded,
    brandsRequested,
    loading,
    history,
}) => {
    useEffect(() => {
        brandsRequested();
        adminService.getAllBrands().then(res => brandsLoaded(res));
    }, [adminService, brandsLoaded, brandsRequested]);

    const brandItems = brands.map(brand => (
        <TableContainerRow
            id={brand.id}
            brand={brand.brand}
            editHandler={() => {
                history.push(`/brand/${brand.id}`);
            }}
            deleteHandler={() => {
                console.log(brand.id);
            }}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <TableContainerGenerator
            tableTitles={BRANDS_TABLE_HEAD}
            tableItems={brandItems}
        />
    );
};

const mapStateToProps = ({ brandsList: { brands, loading } }) => ({
    brands,
    loading,
});
const mapDispatchToProps = { brandsLoaded, brandsRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandList))
);
