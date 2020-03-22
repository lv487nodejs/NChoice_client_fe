import React, { useState } from 'react';
import { FormControl, Paper, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useStyles } from './Brand-add-page-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';
import SnackbarItem from '../snackbar-item';

import { brandSnackbarOpenTrue, brandSnackbarOpenFalse } from '../../actions';

const BrandAddPage = props => {
    const classes = useStyles();

    const { adminService, brandSnackbarOpenTrue, brandSnackbarOpenFalse, open, history } = props;
    const { brandsService } = adminService;

    const [brandName, setBrandName] = useState('');

    const brandSaveHandler = e => {
        e.preventDefault();
        const newBrand = {
            brand: e.target.brandName.value,
        };

        brandsService.postBrand(newBrand).then(res => {
            brandSnackbarOpenTrue();
            setBrandName('');
            history.push(`/brands`);
        });
    };

    const brandNameHandler = e => {
        setBrandName(e.target.value);
    };

    const closeSnackbarHandler = () => {
        brandSnackbarOpenFalse();
    };

    return (
        <form onSubmit={brandSaveHandler}>
            <FormControl>
                <Paper className={classes.brandAdd}>
                    <TextField
                        id="brandName"
                        className={classes.textfield}
                        variant="outlined"
                        label="Brand name"
                        value={brandName}
                        onChange={brandNameHandler}
                        required
                    />
                    <SaveButton type="submit" title="Save" />
                </Paper>
            </FormControl>
            <SnackbarItem
                open={open}
                handleClose={closeSnackbarHandler}
                severity="success"
                message="Successefly created brand!"
            />
        </form>
    );
};

const mapStateToProps = ({ brandsState: { open } }) => ({
    open,
});
const mapDispatchToProps = {
    brandSnackbarOpenTrue,
    brandSnackbarOpenFalse,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(BrandAddPage))
);
