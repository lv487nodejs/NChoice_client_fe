import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { setBrands, brandLoadingStatus } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { BRANDS_TABLE_HEAD } from '../../config';

const BrandList = ({ adminService, brands, setBrands, brandLoadingStatus, loading, history }) => {
    const { brandsService } = adminService;
    useEffect(() => {
        brandLoadingStatus();
        brandsService.getAllBrands().then(res => setBrands(res));
    }, [brandsService, setBrands, brandLoadingStatus]);

    const brandItems = brands.map((brand, index) => (
        <TableContainerRow
            key={index}
            id={brand._id}
            brand={brand.brand}
            editHandler={() => {
                history.push(`/brand/${brand._id}`);
            }}
            deleteHandler={() => {
                console.log(brand._id);
            }}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return <TableContainerGenerator tableTitles={BRANDS_TABLE_HEAD} tableItems={brandItems} />;
};

const mapStateToProps = ({ brandsState: { brands, loading } }) => ({
    brands,
    loading,
});
const mapDispatchToProps = { setBrands, brandLoadingStatus };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandList))
);
