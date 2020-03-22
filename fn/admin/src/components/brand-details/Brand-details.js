import React, { useState, useEffect } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useStyles } from './Brand-details-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';
import SnackbarItem from '../snackbar-item';

import { brandSnackbarOpenTrue, brandSnackbarOpenFalse, setBrand } from '../../actions';

const BrandDetails = props => {
    const classes = useStyles();
    const [brandName, setBrandName] = useState('');
    const {
        adminService,
        brandSnackbarOpenTrue,
        brandSnackbarOpenFalse,
        setBrand,
        brand,
        open,
        match,
        history,
    } = props;
    const { id } = match.params;
    const { brandsService } = adminService;

    useEffect(() => {
        brandsService.getBrandById(id).then(res => {
            setBrand(res);
            setBrandName(res.brand);
        });
    }, [brandsService, id, setBrand]);

    const brandSaveHandler = e => {
        e.preventDefault();
        const newBrand = { ...brand };
        newBrand.brand = brandName;

        brandsService.putBrand(newBrand).then(res => {
            brandSnackbarOpenTrue();
            history.push(`/brands`);
        });
    };

    const closeSnackbarHandler = () => {
        brandSnackbarOpenFalse();
    };

    const chengeHandler = e => {
        setBrandName(e.target.value);
    };

    return (
        <form onSubmit={brandSaveHandler}>
            <Paper className={classes.brandEdit}>
                <TextField
                    id="brandName"
                    className={classes.textfield}
                    variant="outlined"
                    label="Brand name"
                    value={brandName}
                    onChange={chengeHandler}
                    required
                />
                <SaveButton type="submit" title="Save" />
            </Paper>
            <SnackbarItem
                open={open}
                handleClose={closeSnackbarHandler}
                severity="success"
                message="Successefly updated brand!"
            />
        </form>
    );
};

const mapStateToProps = ({ brandsState: { open, brand } }) => ({
    open,
    brand,
});
const mapDispatchToProps = {
    brandSnackbarOpenTrue,
    brandSnackbarOpenFalse,
    setBrand,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandDetails))
);
