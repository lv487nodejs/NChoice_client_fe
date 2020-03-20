import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import { setBrands, brandLoadingStatus } from '../../actions';

import useStyle from './Brand-list-style';
import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { BRANDS_TABLE_HEAD } from '../../config';

const BrandList = ({ adminService, brands, setBrands, brandLoadingStatus, loading, history }) => {
    const { brandsService } = adminService;

    const pathToAddBrandPage = '/brandadd';

    const classes = useStyle();

    useEffect(() => {
        brandLoadingStatus();
        brandsService.getAllBrands().then(res => setBrands(res));
    }, [brandsService, setBrands, brandLoadingStatus]);

    const brandDeleteHandler = id => async () => {
        brandsService.deleteBrand(id).then(res => {
            brandLoadingStatus();
            brandsService.getAllBrands().then(res => setBrands(res));
        });
    };

    const brandItems = brands.map((brand, index) => (
        <TableContainerRow
            key={index}
            id={brand._id}
            brand={brand.brand}
            editHandler={() => {
                history.push(`/brand/${brand._id}`);
            }}
            deleteHandler={brandDeleteHandler(brand._id)}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <div>
            <div className={classes.tableNav}>
                <Button
                    component={Link}
                    to={pathToAddBrandPage}
                    variant="contained"
                    color="primary"
                >
                    New Brand
                </Button>
            </div>
            <TableContainerGenerator tableTitles={BRANDS_TABLE_HEAD} tableItems={brandItems} />
        </div>
    );
};

const mapStateToProps = ({ brandsState: { brands, loading } }) => ({
    brands,
    loading,
});
const mapDispatchToProps = { setBrands, brandLoadingStatus };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandList))
);
